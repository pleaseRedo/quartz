---
Created: 2026-01-27
Type: reference
Aliases:
References:
Links:
  - "[[Neovim]]"
  - "[[+Learning]]"
  - "[[Vim]]"
  - "[[Terminal]]"
---

---
category: Neovim
---
### Update 
Using latest binary overwrites `/program files/neovim`. Verified via `nvim -v`.

Recommended workflow:
Avoid using the mouse and arrow keys if they are not at the home row of your keyboard.
1. relative jump (e.g.: `5j 12-`) for vertical movement within the screen.
2. Use `CTRL-U CTRL-D CTRL-B CTRL-F gg G` for vertical movement outside the screen.
3. Use word-motion (`w W b B e E ge gE`) for short-distance horizontal movement.
4. Use `f F t T , ; 0 ^ $` for medium to long-distance horizontal movement.
5. Use operator `+` motion/text-object (e.g.: `ci{ y5j dap`) whenever possible.
6. Use `%` and square bracket commands (see `:h [`) to jump between brackets.

File operation:
Open another two files with explorer/picker. Swap between buffers(H，L). Add split with content of another buffer, or, split using explorer/picker. Change focus between two windows.

Code Editing
Copy block of code found from somewhere on internet to local files. Add call function somewhere else. Jump to function def, comment out certain line of code. Block indent codes. Go to top the file， adjust add new attributes, go to somewhere else,  make a ref to that attribute. Grep for another attribute, locate its definition. 
I made a practice for above command

## General Mappings
by AstroNvim
	<ctrl + Arrows>: Resize 
	<ctrl + h j k l>: focuse window
	\\: H split
	|: V split
	f7 : toggle terminal

### Motions 
	<count><motion>
	h j k l w } $ : familiarize yourself
	gj gk : down up in a soft-wrapped line
	w e b W E B: word navigation
	ge gE : move backward to the end of previous word/WORD
	 a word is a sequence of characters containing only a-zA-Z0-9_
	 a WORD is a sequence of all characters except white space.
	 : <line number> : jump to specific line  
	 i I a A o O c C : mentioned somewhere. They all entered INSERT mode after using.
### Operators
	<count><verbs>
	including wordwise and linewise
	y d c : should know them
	yy dd cc : yank, deletion and change on entire line.
	J: Join lines, delete the new line at the end of current line
	u: undo
	<ctrl+r> redo
	<ctrl+r> in insert: followed by "+", paste when insert. r for Register.

### Sentence
	A sentence is basically anything that ends with `.`, `?` or `!` followed by a whitespace.  
	) (: move one sentence forward. move to the start of the current sentence.
	} {: Commands to move up or down by one "paragraph" 
### Brackets navigation 
	%: jumps between the matched brackets. Actual behavior: find next item in this line after or under the cursor and jump to its match.
	junmp to unmatched * means jump out, use f( or F( to go to that operator.
	[( : jumps backward to the first unmatched ( 
	[{ : jumps backward to the first unmatched {
		

	][ : jump forward to the next } in the first column
	[] : jump backward to the next } in the first column	
	]] : jump forward to the next { in the first column	
	[[ : jump backward to the next { in the first column

	[% : placeholder, jumps out whatever is bracketing me. It is also the only option to jump out square bracket
	`[[` and `]]` are reserved for a more common operation: jumping to other references to the variable under the cursor (in the same file).
	]e ]w ]d : jump to next error, warning, diagnostics 
### Moving vertical
	{}: jumping based on paragraph, not good for nested code
	<count> motion: obvious
	<ctrl+d/u> : scroll half page. Need to remap so ctl+d become ctl+d followed by a zz command.
	gg/G : move to top/ bottom
	:<line#> : jump to specific line number
	<ctrl+b,f> : scroll by page
	<ctrl+o,ctrl+i>:jump forware/backward in history 
### Moving horizontal
	I, A : beginning of the line and enter INSERT mode.
	W,w,B,b,e,E : moving by word forward or backward.
	0 : beginning of the line
	^ : beginning of the first char of the line
	<count> _ : beginning of the first char of the <count> line, without count works identical as ^
	$ : last char of the line
	`camelCase`, `SNAKE_CASE`, or `kebab-case`: nvim-spider
	
```
myObj.methodName('foo', 'bar', 'baz')
-----ww---------w-w--w--ww--w--ww--w---->
------------------------W------W-------->
```
### Z-mode(scrolling)
	The `z` menu mode is an eclectic mix of cursor positioning, code folding, and random commands.
	zt: top this line
	zb: bottom this line
	zz: center
	0: go to the start of the line. Used in conjunction with z: zt0 zb0
	zl zh: screen to left, screen to right. CAPS: apply to half screen
	zc zo: close folder, open folder
	za : toggle folder, single key for zc zo
### Searching
	/<word> : highlight <word>, press <enter> to jump to that word. Press 'n' to go to next result and it will wrap up, or go backward to using 'N'.
	?<word> : search upward. Better to remap above key combo with 'zz'
	*/# : search for whole word under cursor forward/backward, equivalent to /<wordundercursor>
	g*/# : search for word under cursor forward/backward, if you search "one" and try to match "onetwo", need to use this instead of *

### Visual line mode
	v: Enter visual character mode. In visual mode, <verb> takes immediate effect rather than takes a <motion>.
	o: the other end. move to the oppsite end of the block.
	gv: go to last visual selection. Allows to exit visual mode temporarily
	shift + v: enter visual line mode. following '<' or '>' to manipulate block indent. Using 'jk' to select multiple line in visual line mode.
	<ctrl + V>: enter visual block mode. Allows manipulating block of texts vertically. Usefull when working on tabular data.
	in v-line mode + 'gc,gb' to toggle comment.
	yR<search><label>p: yank and paste with remote seek command

### Register
	named register: one for each letter of the alphabet.
	" : access use the " character, followed by the name of the reg. Then issue the verb and motion you want to perform on that reg.
	"ad3w: delete 3 words in "a" reg.	
	"ap: put texts from "a" reg to somewhere else.
	"A<verb>: append <verb>ed text to "a" reg.
	"Ad<motion>: append the text you deleted to the existing "a" register.
	" or <leader>s : menu showing contents of reg. Or open a picker dialog to search all reg.
	Clipboard Registers: "*"identical to the default(unnamed) register represents system clipboard.
	:let @b = @+: reg copy. In this case, sys clipboard copied to reg "b"
	"0: y command witout specifying a reg, will always stored  "0 register as well as default register. It stayed untill the next yank.
	".: is a register that you may occasionally want to copy into a named register.
	"1 to 9:  contain the text that you most recently changed or deleted, in ascending order.
	"%: name of the editing file.
	qQ: appending to recording. Can recording to different reg like qA qZ.
	Q and @: Q play back a rec always the most recently recorded. @, play back from a different reg, eg. @a, @b.
### Scope
	It is possible to specify the scope of the command (entire buffer, line to line etc.)
	It is oftened achieved by a Range Specifier (%) and flag(g)
	RS:
		% : entire file
		: : current line
		1,5 : line 1 to 5
		'<,'> : visually selected range, this will automatically show up in visual mode.
		.,$ : current line(.) to last line($)
		10,$ : line 10 to last line
		/pattern1/,/pattern2/ : applies within range of lines
	Flag:
		g : global, without this, only first occurance applies.
		c : confirm each line
		n : show number but don't actually apply command.
		i : ignore case
		I : case-sensitive search
		& : repeat last command. :s& will repeat last substitution command
	quiz: :%s/foo/bar/g
### Character editing
	s(substitute) : delete current char and enter INSERT mode with the cursor between the two surrounding chars. 3s will delete next three chars and place the user in insert mode
	c(change) : takes a motion (w,j,b). It deletes the chars from the current cursor position up to the end of the movement. Note that this means that 's' is equivalent to 'cl(l for right)'. 's' has synonyms by using c : 'cl' for 's' and 'cc' for 'S'. 
	f and t very useful in combination with d and c. For example, `ct:` will let you replace everything from your cursor up to the next colon, but not delete the colon.
	d(delete) : similar to 'c' but without entering INSERT.
	r(replace) : never enters INSERT mode. It expects another character, which it will then use to replace the character currently under the cursor.
		Examples : for the word 'can' with cursor at beginning of the word. 
		spl<Esc> : change 'can' to 'plan' 
		cwcould<Esc> : change 'can' to 'could'
		rf: change 'can' to 'fan'
	gc : comment
	gu gU guu gUU: make lower case or upper case for a word, combined with text object gUiw could make whole word uppercase. uu UU, apply to entire line.
	~: inverse character case
	.: dot repeat, repeat verb
	qq,q: recording, play the recording
### Text object
	<verb><context><object>
	High-level context in vim such as Word, Sentence and paragraph re called text objects.
	Common structures :	<number><command><text object or motion> 
	command : an operation 'c'	'a' 'y'
	text obj or motion : a text construct, a word, a sentence a paraggraph or a motion.
	motion : back one page, forward a line, end of the line.
	editing command : a command plus a text object or motion.
	Words : 'aw' a word 'iw' inner word(does not include surrouding white space)
	Sentences : 'as' 'is'
	Paragraphs : 'ap' 'ip'
	Tags : 'at', 'it' <div> </div>, XML tags
	ag ig yig: operate on entire buffer. yig: copy the buffer. Yank in Global 
	Command using a motion 'cw' operates from the current cursor position. A command using a text-object 'ciw' operates on the whole object regardeless of the cursor position.
	Programmin Language Text Objects : " ' `  
	'hello "world"'
	ci" : 'hello ""'
	Parentheses, brackets, braces: ) ] }:
		(defn sum [x y]	
	di]
		(defn sum [])
	text object highlight is position insensitive.
	`d2a{` will delete everything inside the second-nearest set of curly brackets.
### Buffers
	Analogy: Deck of playing cards. The card on top is the only card you see, but you know there are cards below it.
	"tabs" on top left corner
	:edit FILENAME ： create a buffer with new window with a file name.
	']b' '[b' : Next/ Prev buffer
	:buffer + filename: Autocomplete filename with <Tab>.
	:buffer + n : Traverse buffer number n
	Shift + h l : more intuitive way for prev/next buffer
	:buffers : see all buffers
	:qall :qall! :wqall : quit w/o save all
	<leader> fb : manage all buffers
### Windows
	A window is a viewport on a buffer. It is how you are viewing a buffer through. Split is used upon on window.
	You can have multiple window displaying the same buffer. ':buffer file.js' : typing on current window will see chanegs on both windows.
	:q : close current window, buffer remains. If it is last window on tab, they all closed.
	Ctrl-w : window menu
	Ctrl-w V,S : open a new vert/hori split
	Ctrl-w C : Closes 
	Ctrl-w O : Makes current window only one on screen and closes others.
	:vsplit :split filename : Split windows ver/hori
	:new filename : Create new window
### Tabs
	A tab is a collection of windows. A layout for windows. You close a tab, you only close the layout. Files opened in that layout are still not closed, they are still opened in their buffers.
	Top right corner 1,2,3 shows tabs
	One advantage of having multiple tabs is you can have different window arrangement in different tabs.
	:tabnew
	gt gT : go next/prev tab page. You can also pass count argument.
	<leader> + <tab> : tab menu
	<leader> + <tab> + <tab> : new tab
### Sessions
	Sessions are scoped to folders
	<leader> Ss: save session
	<leader> Sl: restore session
	
### Advanced motions
	horizontal movements
	after familiarize 'f,w,l'
	jumping foward text objects commands 
	function foo (balz: {oddly: "long" | "type", but : "hey" | "this" | "is" | number}){ }		
	function new_fn(bar:number) { }
	standard way to highlight type and replaced with bar: f{vf}yjwhp
	vi( : select everything within
	va( : select everything around 
	also work if you are not in between the braces
	after pasting, you lost what is in the clip register. 
	vd to dd, vy to yy

### Line Movement
	o,i(nsert),a(ppend): below, before, after
	O,I,A: above, before the line, after the line	
	$ : last character
	^ : first non-blank character
	g_ : go to last non-blank character
	nl : go to column n in the current line

### Search
	:vim /pattern/ file : search "pattern" in file
	:grep -R "pattern" file : using terminal 'grep'. You can omit '-R' if replaced grep with ripgrep.
#### Search and replace
	replace all
	:grep "foo"
	:cfdo %s/foo/bar/g | update
	above two lines will repalce all instances of 'foo' with 'bar'
	:cfdo : executes any command yu pass to all files in quickfix list.
	| : pipe is a chain operator, update command saves each file after substitution.
	search and replace : 
### Browsing files
	vim <directory> or :edit <directory> : using netrw for file browsing.
	using NerdTree is preferred
	
### LSP
	using trouble.nvim can have a more fancy way to search symbols and qf
	<leader> ls : search symbols
	gd gD: go definition go Declaration
	Control-q： dump picker result to Quick Fix list
### Quickfix list
	topics: https://www.reddit.com/r/neovim/comments/1fhy2xi/how_switch_between_references_like_theprimeagen/
	might need knowledge about go-to-list etc.	
	In Vim the quickfix commands are used: more to find a list of psitions in files. 
	After :vimgrep, can use quickfix window :copen or <leader>x.

### Revert
	u :u : Revert the last editing change
	<C-r> :redo : reapplies a change that was previously undone
	[number]u 
	U : Reverts all the latest changes made to the current line
	:e! :edit! : Discards all changes made the the buffer since last save
	Learlier 1f : back to 1 file write ago
	:u0 : reverts buffer to the staet before any changes were made
### Starting
	vim command can take many different options.
	+{CMD} and -c CMD: Allow you to pass a Vim command 
	ls -l | vim -: being a terminal command, redirect the output of the ls to be edited in Vim.

### Misc
	g <C-g> : word count
### External integration
```
Id|Name|Cuteness
01|Puppy|Very
02|Kitten|Ok
03|Bunny|Ok
```
	!}column -t -s "|" : column is a terminal command. 
	! : is a filter operator which accept another argument
```
Id  Name    Cuteness
01  Puppy   Very
02  Kitten  Ok
03  Bunny   Ok
```
	!}column -t -s "|" | awk 'NR > 1 && /Ok/ {print $0}'
```
02  Kitten  Ok
03  Bunny   Ok
```

## CMD Mode
### Find and Replace
```
:[range]s/search_pattern/replacement_string/[flags]
```
	[range] : % entire, 'a,'b between two marks, .,+x current line and next X lines, '<,'> visual selection range, empty current line
	[flags] : g global, c ask for confirmation, n report count without making change.
	1. Now the user realised they misspelt a phrase multiple times without realising. They can press `Esc` if they are not already in normal mode and type: `:%s/registrs/registers/gc`.
    
    1.1 `:%s` is the string search and replace command.
    
    1.2 `registrs` is the target string to replace. In this case, it is our typo.
    
    1.3 `registers` is the target string we will replace our typo string with.
    
    1.4 `gc` is telling vim to perform this search and replace globally (within the whole file), and `c` is to ask the user for confirmation on each replacement occurrence. This means you can _selectively search and replace_.
    
    1.5 It supports regular expressions too :D
### :global / :g
	:g/pattern/command
	:g/TODO/d : delete all lines includes TODO
	:g/^#/d : delete all commented line, (^# first char has #)
	:v/pattern/command : inverse version of g
	
### :unique/:sort
	:sort u : unique
	:sort! : inverse order

### range
	:[range] command
	:1,10s/foo/bar/g : line 1 to 10
	:.,$d : currnet line to eof
	:%s/foo/bar/g : whole file
	:'<,'>s/foo/bar/g : visual selection
	:/begin/,/end/d
### :bufdo/:tabdo
	:bufdo %s/old/new/g
### :normal
	batch normal command in visual mode
	:normal A; : append ; to selected line 
	:g/^int /normal A; : append to all lines begin with int
### :retab
	unify tab / space
### :grep/vimgrep
	:vimgrep /pattern/ **/*.cpp
	:copen
	: search entire project, result goes to quickfix
	expected to see:
	'a.cpp:23: // TODO fix this'
	'b.cpp:88: // TODO remove'
### read/ :r
	:r {source}: read from source, insert to cursor
	:r !ls
	:r !date
	:r !nvidia-smi
	:r !git status