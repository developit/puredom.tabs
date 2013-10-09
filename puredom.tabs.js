(function() {
	
	/**	@private */
	var priv = {
		className : 'tabContainerBase',
		instanceid_counter : 0,
		instances : {}
	};
	
	
	/**	Convert the selected node into a tabbed layout.
	 *	@param {puredom.StateManager} [stateManager]	A StateManager instance for tab state persistence.
	 *	@param {Object} [options]						Hashmap of options for tab creation.
	 *	@param {Object} [options.tabViewName=auto]		Manually specify a name for the tab view. Alternatively, you can specify a name via the "data-tabview-name" attribute on your HTML element.
	 *	@function
	 *	@name puredom.NodeSelection#tabs
	 *	@example puredom(".myTabs").tabs(options);
	 */
	puredom.addNodeSelectionPlugin('tabs', function(stateManager, options) {
		create(this, stateManager, options);
	});
	
	
	/**	Remove tabbed layout modifications from the selected node.
	 *	@param {puredom.StateManager} [stateManager]	Disconnect the tabs from a StateManager.
	 *	@function
	 *	@name puredom.NodeSelection#removeTabs
	 *	@example puredom(".myTabs").removeTabs(options);
	 */
	puredom.addNodeSelectionPlugin('removeTabs', function(stateManager) {
		destroy(this, stateManager);
	});
	
	
	function create(base, stateManager, options) {
		var self,
			id;
		options = options || {};
		if (!base || !base.each) {
			return null;
		}
		
		if (base.attr('data-tabs-instance')) {
			id = base.attr('data-tabs-instance');
		}
		else {
			priv.instanceid_counter += 1;
			id = priv.instanceid_counter+'';
		}
		self = priv.instances[id] = {
			id : id
		};
		
		self.tabViewName = options.tabviewName || options.stateId || base.attr('data-tabview-name') || ('tab'+id);
		
		base.classify('tabContainerBase').attr('data-tabs-instance', id);
		
		base.query('>.tabContainer>.tab').on('click', handleTabClick);
		
		
		self.tabState = {
			id : self.id,
			doStateUpdate : function() {
				var self = getDataFromId(this.id),
					tab = self.activeTab;
				if (this.setState) {
					this.setState(tab);
				}
			},
			restoreState : function(tab) {
				if (tab) {
					base.query('>.tabContainer>.tab[data-tabid='+tab+']').fireEvent('click');
				}
				else {
					base.query('>.tabContainer>.tab').first().fireEvent('click');
				}
			}
		};
		
		if (stateManager) {
			stateManager.removeObject(self.tabViewName);
			stateManager.addObject(self.tabViewName, self.tabState);
		}
		else {
			self.tabState.restoreState();
		}
		
		setTimeout(function() {
			options = stateManager = self = null;
		}, 1);
		
		return self.tabState;
	}
	
	
	function destroy(base, stateManager) {
		var self = getDataFromBase(base);
		if (self) {
			if (stateManager) {
				stateManager.removeObject(self.tabViewName);
			}
			priv.instances[self.id] = null;
		}
	}
	
	
	function getBase(child) {
		var p = child;
		do {
			if (p.hasClass(priv.className)) {
				return p;
			}
		} while((p=p.parent()).exists() && p.nodeName()!=='body');
		return false;
	}
	
	
	function getDataFromBase(base) {
		var id = base.attr('data-tabs-instance');
		return getDataFromId(id);
	}
	
	
	function getDataFromId(id) {
		var self = priv.instances[id];
		if (id && self) {
			return self;
		}
		return null;
	}
	
	
	function handleTabClick(e) {
		var me = puredom(this),
			tabId = me.attr('data-tabid'),
			base = getBase(me),
			data = getDataFromBase(base),
			activePanel;
		me.siblings().declassify('active');
		me.classify('active');
		data.activeTab = tabId;
		base.query('>.tabPanelContainer>[data-tabid]').each(function(panel) {
			if (panel.attr('data-tabid')===tabId) {
				activePanel = panel.show();
			}
			else {
				panel.hide(true);
			}
		});
		if (data.tabState) {
			data.tabState.doStateUpdate();
		}
		return puredom.cancelEvent(e);
	}
	
}());
