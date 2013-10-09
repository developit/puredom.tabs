
puredom.tabs
============
A puredom plugin for creating tabbed layouts.


What it Does
------------

Converts the elements of a selection into a tabbed layout, with optional StateManager persistence.


.tabs(): Convert this into a tabbed layout
------------------------------------------

`.tabs(stateManager, options)` converts things to tabs.

```JavaScript
var state = new puredom.StateManager('id');

puredom('.foo').tabs(state, {
	tabViewName : 'footab'		// think ?footab=first
});
```

.removeTabs(): Kill it with fire
--------------------------------

`.removeTabs(stateManager)` removes any tab-related modifications from the node.

```JavaScript
var state = new puredom.StateManager('id');

// Convert to a tabbed layout:
puredom('.foo').tabs(state);

// Revert back to what it was before:
puredom('.foo').removeTabs(state);
```

License
-------
This plugin is available under the BSD-3-Clause License:

>	Copyright (c) Jason Miller. All rights reserved.
>	
>	Redistribution and use in source and binary forms, with or without modification, 
>	are permitted provided that the following conditions are met:
>	
>	*	Redistributions of source code must retain the above copyright notice, 
>		this list of conditions and the following disclaimer.
>	
>	*	Redistributions in binary form must reproduce the above copyright notice, 
>		this list of conditions and the following disclaimer in the documentation 
>		and/or other materials provided with the distribution.
>	
>	*	Neither the name of Jason Miller, nor the names of its contributors may be used to endorse 
>		or promote products derived from this software without specific prior written permission.
>	
>	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
>	OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
>	AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER 
>	OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
>	DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
>	DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
>	IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY 
>	OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.