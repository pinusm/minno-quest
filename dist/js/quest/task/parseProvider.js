define([],function(){function e(e){function t(t,n){n.createColl("pages"),n.createColl("questions"),n.add("pages",t.pagesSets||[]),n.add("questions",t.questionsSets||[]),t.settings||(t.settings={}),e.setSettings(t.settings.DEBUG||{})}return t}return e.$inject=["piConsole"],e});