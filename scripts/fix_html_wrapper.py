#!/usr/bin/env python3
"""
fix_html_wrapper.py

Percorre uma pasta e garante que cada arquivo .html tenha o conteúdo principal
envolvido por <div id="conteudo-principal">...</div>. Mantém o elemento
#menu-lateral fora do wrapper e preserva scripts finais fora do wrapper.

Uso:
    python3 scripts/fix_html_wrapper.py "Relógio Digital"

Observações:
- Trabalha por análise textual (não requer dependências externas).
- Faz backup dos arquivos modificados com extensão .bak antes de sobrescrever.
"""
import sys
import os
import re


def find_matching_div_end(s, start_pos):
    """Encontra o índice do fim do </div> correspondente ao <div> que começa em start_pos.
    Retorna o índice do caractere final do fechamento (posição do '>') ou -1 se não encontrar.
    """
    # Regex para localizar próximas tags <div ...> ou </div>
    pattern = re.compile(r'<(/)?div\b', re.IGNORECASE)
    pos = start_pos
    m = pattern.search(s, pos)
    if not m or m.start() != start_pos:
        # não há <div começando exatamente em start_pos
        # tentar localiza a próxima ocorrência a partir de start_pos
        m = pattern.search(s, start_pos)
        if not m:
            return -1
        # ajusta start_pos para a posição da abertura encontrada
        pos = m.start()

    depth = 0
    i = pos
    while True:
        m = pattern.search(s, i)
        if not m:
            return -1
        is_closing = bool(m.group(1))
        # encontra o final da tag atual (>), começando em m.start()
        tag_start = m.start()
        gt = s.find('>', tag_start)
        if gt == -1:
            return -1
        if not is_closing:
            depth += 1
        else:
            depth -= 1
        i = gt + 1
        if depth == 0:
            # encontramos o fechamento correspondente; retornar índice do '>'
            return i - 1


def wrap_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    # já possui conteudo-principal?
    if re.search(r'id=["\']conteudo-principal["\']', text, re.IGNORECASE):
        return False, 'already'

    body_match = re.search(r'<body[^>]*>([\s\S]*?)</body>', text, re.IGNORECASE)
    if not body_match:
        return False, 'no-body'

    inner = body_match.group(1)
    body_start = body_match.start(1)
    body_end = body_match.end(1)

    # localizar menu-lateral
    menu_match = re.search(r'<div[^>]*id=["\']menu-lateral["\'][^>]*>', inner, re.IGNORECASE)
    menu_html = ''
    rest = inner
    if menu_match:
        menu_open_start = menu_match.start()
        # encontrar fim do div do menu
        abs_start = body_start + menu_open_start
        end_idx = find_matching_div_end(text, abs_start)
        if end_idx == -1:
            return False, 'menu-parse-failed'
        # extrair menu_html e restante (ajustando para índices relativos)
        menu_html = text[body_start + menu_open_start: end_idx + 1]
        rest = inner[menu_open_start + len(menu_html):]
    else:
        menu_html = ''
        rest = inner

    # separar scripts finais (preservar tags <script>...</script> que ficam no final)
    scripts_match = re.search(r'(?:\s*(?:<script[\s\S]*?</script>\s*))+\s*\Z', rest, re.IGNORECASE)
    scripts_block = ''
    if scripts_match:
        scripts_block = scripts_match.group(0)
        rest_no_scripts = rest[:scripts_match.start()]
    else:
        rest_no_scripts = rest

    # construir novo inner com wrapper
    new_inner = ''
    if menu_html:
        new_inner += menu_html
    new_inner += '\n<div id="conteudo-principal">\n' + rest_no_scripts + '\n</div>\n'
    if scripts_block:
        new_inner += scripts_block

    # substituir no documento
    new_text = text[:body_start] + new_inner + text[body_end:]

    # criar backup
    bak_path = path + '.bak'
    with open(bak_path, 'w', encoding='utf-8') as f:
        f.write(text)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)

    return True, 'wrapped'


def main():
    if len(sys.argv) < 2:
        print('Uso: python3 scripts/fix_html_wrapper.py "Relógio Digital"')
        sys.exit(1)

    folder = sys.argv[1]
    if not os.path.isdir(folder):
        print('Pasta não encontrada:', folder)
        sys.exit(1)

    changed = []
    skipped = []
    errors = []
    for name in os.listdir(folder):
        if not name.lower().endswith('.html'):
            continue
        path = os.path.join(folder, name)
        ok, reason = wrap_file(path)
        if ok:
            changed.append(name)
            print(f'Wrapped: {name}')
        else:
            if reason == 'already':
                skipped.append((name, 'already has wrapper'))
            else:
                errors.append((name, reason))

    print('\nResumo:')
    print('Arquivos modificados:', len(changed))
    for n in changed:
        print('  -', n)
    print('Arquivos ignorados (já ok):', len(skipped))
    for n, r in skipped:
        print('  -', n, r)
    if errors:
        print('Erros:')
        for n, r in errors:
            print('  -', n, r)


if __name__ == '__main__':
    main()
