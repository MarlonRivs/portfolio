export type EditorTokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'variable'
  | 'type'
  | 'html'
  | 'blade'
  | 'identifier'
  | 'punct'
  | 'plain';

export interface EditorToken {
  readonly type: EditorTokenType;
  readonly text: string;
}

const PHP_KEYWORDS = new Set([
  'abstract',
  'and',
  'array',
  'as',
  'break',
  'callable',
  'case',
  'catch',
  'class',
  'clone',
  'const',
  'continue',
  'declare',
  'default',
  'do',
  'echo',
  'else',
  'elseif',
  'empty',
  'endfor',
  'endforeach',
  'endif',
  'endswitch',
  'extends',
  'false',
  'final',
  'finally',
  'fn',
  'for',
  'foreach',
  'function',
  'global',
  'goto',
  'if',
  'implements',
  'include',
  'include_once',
  'instanceof',
  'insteadof',
  'interface',
  'isset',
  'list',
  'match',
  'namespace',
  'new',
  'null',
  'or',
  'private',
  'protected',
  'public',
  'readonly',
  'require',
  'require_once',
  'return',
  'static',
  'switch',
  'throw',
  'trait',
  'true',
  'try',
  'use',
  'var',
  'while',
  'yield',
  'from',
]);

function pushToken(
  out: EditorToken[],
  type: EditorTokenType,
  text: string,
): void {
  if (text.length > 0) {
    out.push({ type, text });
  }
}

export function tokenizePhpSnippet(source: string): EditorToken[] {
  const out: EditorToken[] = [];
  let i = 0;

  while (i < source.length) {
    const c = source[i];

    if (c === '/' && source[i + 1] === '/') {
      const start = i;
      i += 2;
      while (i < source.length && source[i] !== '\n') {
        i++;
      }
      pushToken(out, 'comment', source.slice(start, i));
      continue;
    }

    if (c === '#' && source[i + 1] !== '[') {
      const start = i;
      i++;
      while (i < source.length && source[i] !== '\n') {
        i++;
      }
      pushToken(out, 'comment', source.slice(start, i));
      continue;
    }

    if (c === '/' && source[i + 1] === '*') {
      const start = i;
      i += 2;
      while (i < source.length - 1 && !(source[i] === '*' && source[i + 1] === '/')) {
        i++;
      }
      i = Math.min(source.length, i + 2);
      pushToken(out, 'comment', source.slice(start, i));
      continue;
    }

    if (c === '"' || c === "'") {
      const quote = c;
      const start = i;
      i++;
      while (i < source.length) {
        const ch = source[i];
        if (ch === '\\') {
          i += 2;
          continue;
        }
        if (ch === quote) {
          i++;
          break;
        }
        i++;
      }
      pushToken(out, 'string', source.slice(start, i));
      continue;
    }

    if (c === '$') {
      const start = i;
      i++;
      while (i < source.length && /[a-zA-Z0-9_]/.test(source[i])) {
        i++;
      }
      pushToken(out, 'variable', source.slice(start, i));
      continue;
    }

    if (c >= '0' && c <= '9') {
      const start = i;
      i++;
      while (i < source.length && /[0-9_.]/.test(source[i])) {
        i++;
      }
      pushToken(out, 'number', source.slice(start, i));
      continue;
    }

    if (/[a-zA-Z_]/.test(c)) {
      const start = i;
      i++;
      while (i < source.length && /[a-zA-Z0-9_]/.test(source[i])) {
        i++;
      }
      const word = source.slice(start, i);
      if (PHP_KEYWORDS.has(word.toLowerCase())) {
        pushToken(out, 'keyword', word);
      } else if (/^[A-Z]/.test(word)) {
        pushToken(out, 'type', word);
      } else {
        pushToken(out, 'identifier', word);
      }
      continue;
    }

    if (source.startsWith('<?php', i)) {
      pushToken(out, 'keyword', '<?php');
      i += 5;
      continue;
    }

    if (source.startsWith('<?=', i)) {
      pushToken(out, 'keyword', '<?=');
      i += 3;
      continue;
    }

    if (/[{}\[\]();,:.<>\-|&+=!?*^%~@]/.test(c) || c === '\n') {
      pushToken(out, 'punct', c);
      i++;
      continue;
    }

    pushToken(out, 'plain', c);
    i++;
  }

  return out;
}

export function tokenizeBladeSnippet(source: string): EditorToken[] {
  const out: EditorToken[] = [];
  let i = 0;

  while (i < source.length) {
    const c = source[i];

    if (source.startsWith('{{--', i)) {
      const start = i;
      i += 4;
      while (i < source.length - 3 && !source.startsWith('--}}', i)) {
        i++;
      }
      i = Math.min(source.length, i + 4);
      pushToken(out, 'comment', source.slice(start, i));
      continue;
    }

    if (c === '@' && /[a-zA-Z_]/.test(source[i + 1] ?? '')) {
      const start = i;
      i++;
      while (i < source.length && /[a-zA-Z0-9_]/.test(source[i])) {
        i++;
      }
      pushToken(out, 'blade', source.slice(start, i));
      continue;
    }

    if (c === '<' && /[a-zA-Z!?/]/.test(source[i + 1] ?? '')) {
      const start = i;
      i++;
      while (i < source.length && source[i] !== '>') {
        i++;
      }
      if (i < source.length) {
        i++;
      }
      pushToken(out, 'html', source.slice(start, i));
      continue;
    }

    if (c === '{' && source[i + 1] === '{') {
      const start = i;
      i += 2;
      while (
        i < source.length - 1 &&
        !(source[i] === '}' && source[i + 1] === '}')
      ) {
        i++;
      }
      if (i < source.length - 1) {
        i += 2;
      }
      pushToken(out, 'blade', source.slice(start, i));
      continue;
    }

    if (source.startsWith('<?php', i) || source.startsWith('<?=', i)) {
      const rest = source.slice(i);
      let j = i;
      if (rest.startsWith('<?php')) {
        j += 5;
      } else {
        j += 3;
      }
      while (j < source.length && !source.startsWith('?>', j)) {
        j++;
      }
      const block = source.slice(i, Math.min(source.length, j + 2));
      out.push(...tokenizePhpSnippet(block));
      i = Math.min(source.length, j + 2);
      continue;
    }

    pushToken(out, 'plain', c);
    i++;
  }

  return out;
}

export function highlightCode(path: string, source: string): EditorToken[] {
  if (path.endsWith('.blade.php')) {
    return tokenizeBladeSnippet(source);
  }
  if (path.endsWith('.php')) {
    if (source.trimStart().startsWith('<')) {
      return tokenizeBladeSnippet(source);
    }
    return tokenizePhpSnippet(source);
  }
  return tokenizePhpSnippet(source);
}

export function editorTokenClass(type: EditorTokenType): string {
  switch (type) {
    case 'keyword':
      return 'text-[#cba6f7]';
    case 'string':
      return 'text-[#a6e3a1]';
    case 'comment':
      return 'text-[#6c7086] italic';
    case 'number':
      return 'text-[#fab387]';
    case 'type':
      return 'text-[#89dceb]';
    case 'variable':
      return 'text-[#f9e2af]';
    case 'html':
      return 'text-[#74c7ec]';
    case 'blade':
      return 'text-[#f5c2e7]';
    case 'identifier':
      return 'text-[#cdd6f4]';
    case 'punct':
      return 'text-[#bac2de]';
    default:
      return 'text-[#bac2de]';
  }
}
