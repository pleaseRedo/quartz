# WezTerm Keybindings

## Modifiers
- **MOD** = `Ctrl + Shift` (Windows) / `Super + Shift` (macOS / Linux)
- **smart-splits modifiers**
  - Move: `Ctrl`
  - Resize: `Ctrl`
## smart-splits (Pane / Neovim)

### Move (pane / nvim window)
- `Ctrl + h` → Left
- `Ctrl + j` → Down
- `Ctrl + k` → Up
- `Ctrl + l` → Right

> In Neovim: moves between splits  
> At Neovim edge: jumps to WezTerm pane  
> In shell: moves between WezTerm panes

### Resize (pane / nvim split)
- `Ctrl + ←` → Resize left
- `Ctrl + ↓` → Resize down
- `Ctrl + ↑` → Resize up
- `Ctrl + →` → Resize right
## Tabs
- `MOD + t` → New tab
- `MOD + w` → Close tab
- `MOD + h` → Previous tab
- `MOD + l` → Next tab
- `MOD + <` → Move tab left
- `MOD + >` → Move tab right
## Splits (WezTerm)
- `MOD + Enter` → Smart split (auto horizontal / vertical)
- `MOD + |` → Split horizontal (up / down)
- `MOD + _` → Split vertical (left / right)
- `MOD + q` → Close pane
- `MOD + R` → Rotate panes (clockwise)
- `MOD + S` → Pane select
## Scroll back
- `MOD + k` → Scroll up (½ page)
- `MOD + j` → Scroll down (½ page)
## Font
- `MOD + {` → Font size −
- `MOD + }` → Font size +
## Clipboard / Search
- `MOD + c` → Copy to clipboard
- `MOD + v` → Paste from clipboard
- `MOD + Space` → Quick select(flash a given pattern: url/dir/number etc.)
- `MOD + X` → Copy mode
- `MOD + f` → Search (current selection or empty)
- `MOD + u` → Character / emoji select
## UI
- `MOD + m` → Toggle pane zoom
- `MOD + p` → Command palette
- `MOD + d` → Debug overlay
## Notes (Windows key pitfalls)
- `|`, `_`, `{`, `}` may be unreliable on Windows when used as `key` values  
- More stable alternatives:
  - `|` → `Backslash`
  - `_` → `Minus`
  - `{` / `}` → `[` / `]`
