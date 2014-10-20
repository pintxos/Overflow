(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.Overflow = definition(jQuery, pintxos.inherit, pintxos.Component, pintxos.ScrollableNative);
			define = null;
		};
	}

	define(
	[
		'jquery',
		'pintxos-inherit',
		'pintxos-component',
		'pintxos-scrollable_native'
	],
	function (
		$,
		inherit,
		Component,
		ScrollableNative
	) {


		var Overflow, _defaults;

		/* Default settings
		----------------------------------------------- */
		_defaults = {
			scrollableEl: undefined,
			css: {
				begin: 'js-overflow-begin',
				end: 'js-overflow-end'
			}
		};


		/* Constructor
		----------------------------------------------- */
		Overflow = function (el, options) {
			this._settings = $.extend(true, {}, _defaults, options);
			Component.call(this, el, this._settings);
		};

		inherit(Overflow, Component);

		/* Static properties
		----------------------------------------------- */
		Overflow.BEGIN = 'begin';
		Overflow.END = 'end';

		/* Methods
		----------------------------------------------- */

		/**
		 * All bootstrap logic should go here
		 * @return {void}
		 */
		Overflow.prototype.init = function () {

			this._scrollable = new ScrollableNative(this.getScrollableEl()[0], {
				scrollableEl: this.getSettings().scrollableEl
			});

			this._scrollable.init();

			this._on(this.getScrollableEl(), 'scroll', this._onScroll);

			Overflow._super.init.call(this);

			this.refresh();
		};

		Overflow.prototype.refresh = function () {

			if(this._scrollable.isEndReached()) {
				this.removeOverflow(Overflow.END);
			}else {
				this.setOverflow(Overflow.END);
			}

			if(this._scrollable.isBeginReached()) {
				this.removeOverflow(Overflow.BEGIN);
			}else {
				this.setOverflow(Overflow.BEGIN);
			}
		};

		Overflow.prototype.setOverflow = function (pos) {
			this.getEl().addClass(this.getSettings().css[pos]);
		};

		Overflow.prototype.removeOverflow = function (pos) {
			this.getEl().removeClass(this.getSettings().css[pos]);
		};


		Overflow.prototype.getScrollableEl = function (reset) {

			var scrollableEl;

			if(typeof this._$scrollableEl === 'undefined' || reset) {

				scrollableEl = this.getSettings().scrollableEl;

				if(typeof scrollableEl === 'undefined') {

					// defaults to the component's main element
					this._$scrollableEl = this.getEl();

				}else if(scrollableEl instanceof $) {

					// jQuery object
					this._$scrollableEl = scrollableEl;

				}else if(typeof scrollableEl === 'string') {

					// selector
					this._$scrollableEl = this._query(scrollableEl);

				}

			}

			return this._$scrollableEl;
		};

		/**
		 * All teardown logic should go here
		 * @return {void}
		 */
		Overflow.prototype.destroy = function () {
			this._$scrollableEl = undefined;

			this._scrollable.destroy();
			this._scrollable = undefined;

			Overflow._super.destroy.call(this);
		};


		/* Event handlers
		----------------------------------------------- */
		Overflow.prototype._onScroll = function (e) {
			this.refresh();
		};

		/* Export
		----------------------------------------------- */
		return Overflow;

	});

})(this);
