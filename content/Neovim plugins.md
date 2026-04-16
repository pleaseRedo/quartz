https://www.bilibili.com/video/BV1zY4y1Z7FR/?spm_id_from=333.999.0.0&vd_source=fa78d7b6f3ec29725a0e788b175a07b6
Telescope, github
## leap.nvim
	Using flash now
	<leader>a : leap backward 
	<leader>s : leap forward
	gs : leap from window
	S: Seeking surround objects. After spcifying a verb, e.g cS entered Seek mode. 
	R: seeking surrounding objects remotely. Specifying a verb first, Vim is essentially in seek mode, type few chars to find matches, but in object mode.
	r: single seeking mode. Rather than surround seek
vim-maximizer
vim-tmux-navigator

## flash
	seeking text
	s: invoke **s**eek 

## snipe
	Snipe is like a "dynamic" harpoon, it automatically assigns a character to each one of your open buffers from a dictionary you specify.
	,<tag><action>
	,: <leader>
	<tag>: every buffer will be assigned a character as <tag> 
	<action>: d,v,h close, v-split h-split
	J,K: next page, last page 
	D,V,H: same as d,v,h but works on cursor

## yanky
[yanky](https://github.com/gbprod/yanky.nvim)

	<leader>P : yank history
	p : yank put after
	P : yank put before
	gp/P : yank g put after/before
	<c-p> : yank prev entry
	<c-n> : yank next entry
## harpoon2
	Harpoon on the other hand is something more static, I think of it like "bookmarks", so you add files to harpoon, then you can switch to those files by pressing `<leader>1`, `<leader>2`, etc. You can reorganize your files in the harpoon menu, and I normally use it for files I want to always be in the same place. For example, I know that `1` is for my zshrc file, and `2` is for my keymaps.lua file, etc. You can have different harpooned files on each tmux session, and when you quit and re-open neovim, your harpooned files will remain there
	<leader>a: add file
	<leader>aa: harpoon list
	<leader>a + hjkl: harpoon file 1 2 3 4
	<leader> n p: harpoon next/ harpoon prev
## snacks.picker
	fuzzy find: you can skip letters
	<leader>f : f find files in root F find files in cwd
	in ff
	lowercase: all lowercase key is case insensitive
	uppercase: with any Uppercase, the mathch will be case sensitive
	<space> : add <space> between kw, picker will filter new kw
	flash: <Alt>s enables flash
	scroll: <ctrl-d> <ctrl-u> scroll in result window. <ctrl-f> <crtl-b> scroll in preview window
	

## telescope
	currently disabled due to AstroNvim distro
	<leader> ff : find files, press v for split view
	:Telescope buffers : list buffers
	:Telescope spell_suggest
## mini.surround
	- Add surrounding with `sa` (in visual mode or on motion).
	- Delete surrounding with `sd`.
	- Replace surrounding with `sr`.
	- Find surrounding with `sf` or `sF` (move cursor right or left).
	- Highlight surrounding with `sh`.
	- Change number of neighbor lines with `sn`.
## vim-surround
	"Hello world"
	cs"' : 'Hello world'
	ds' : Hello world
	ysiw] : wrap word[Hello] world
	yssb yss) : wrap entire line in paraentheses

## nvim-surround
	ys, ds, cs{motion}{char} : add/delete/change
	example : * denotes cursor position
	surr*ound_words             ysiw)           (surround_words)
	*make strings               ys$"            "make strings"
    [delete ar*ound me!]        ds]             delete around me!
    remove <b>HTML t*ags</b>    dst             remove HTML tags
    'change quot*es'            cs'"            "change quotes"
    <b>or tag* types</b>        csth1<CR>       <h1>or tag types</h1>
    delete(functi*on calls)     dsf             function calls
## NeoTree
	using <leader> + o/e for toggle neotree
	r : rename 
	a : add file, {dir_name} + '/' add a directory
	d : delete a file
	y p : copy paste
	s : open with split screen

## diffview
[diffview](https://github.com/sindrets/diffview.nvim)

	:DiffviewOpen [git rev] [options] [--]
	:DiffviewFileHistory : The current branch
	:DIffviewFileHistory % : The current file
	g? : open help panel	

## cpp
	clang++ -debug main.cpp -o main : need debug mode during compiling in terminal

## comment
	work with line-wise comment as well as block-wise comment
	<Leader> / : builtin comment
	gc gb + [count]{motion} : gc2j comment next 2 lines
	[count] + gcc gbc : toggles the number of lines block given as a prefix-count.
	gc gb : VISUAL MODE
	gco gca gcO : Insert comment to the o O A.
	possible extension: 
	gc$ gc} gc5j gca
	gcw : temporarily comment a word, comment a word but leaves a noticible braces surrounding the word.

## trouble
	A pretty list for showing diagnostics, references, telescope results, quickfix and location lists to help you solve all the trouble your code is causing.
	<leader>xx xX : (buffer) diagnostics(trouble)
	<leader>xL : location list
	<leader>xQ : Quickfix list
	<leader>cs : symbols toggle
	<leader>cl : LSP def/ref/ toggle
## gitsigns
	<leader> gs : stage hunks, commit certain line of your file, not all of changes in that file
	<leader> gr gu gp: reset hunk, unstage hunk, preview hunk

## zoxide
	A neovim wrapper 
	:Z {query} : cd to the highest ranked directory matching your query. if omitted, to home.
	:Lz {query} : local to the current window. this means other window won't see dir changes.
	:Tz {query} : local to the current tab
	:Zi Lzi Tzi{query} : fzf