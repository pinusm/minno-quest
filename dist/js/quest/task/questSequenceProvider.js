define(["require","underscore"],function(e){function n(e){function n(t,n){if(!n)throw new Error("Sequences need to take a db as the second argument");this.sequence=new e("pages",t,n),this.db=n}return t.extend(n.prototype,{next:function(e){return this.sequence.next(e),this},prev:function(e){return this.sequence.prev(e),this},current:function(n){var r=this.sequence.current(n);if(!r)return r;var i=(new e("questions",r.questions,this.db)).all({pagesData:r.data,pagesMeta:r.$meta});return r=t.clone(r,!0),r.questions=i,r}}),n}var t=e("underscore");return n.$inject=["TaskSequence"],n});