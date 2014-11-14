(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.Overflow = definition(jQuery, pintxos.inherit, pintxos.Component, pintxos.ScrollableNative, pintxos.ScrollableHA);
			define = null;
		};
	}

	define(
	[
		'jquery',
		'pintxos-inherit',
		'pintxos-component',
		'pintxos-scrollable_native',
		'pintxos-scrollable_ha'
	],
	function (
		$,
		inherit,
		Component,
		ScrollableNative,
		ScrollableHA
	) {


		var Overflow, _defaults;

		/* Default settings
		----------------------------------------------- */
		_defaults = {
			orientation: 'horizontal',
			useTranslate: false,
			selectors: {
				scrollableEl: undefined
			},
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

			return this;
		};

		inherit(Overflow, Component);


		/* Static properties
		----------------------------------------------- */
		Overflow.BEGIN = 'begin';
		Overflow.END = 'end';
		Overflow.HORIZONTAL = 'horizontal';
		Overflow.VERTICAL = 'vertical';


		/* Methods
		----------------------------------------------- */

		/**
		 * All bootstrap logic should go here
		 * @return {void}
		 */
		Overflow.prototype.init = function () {

			var scrollableOptions;

			scrollableOptions = {
				orientation: this.getSettings().orientation
			};

			this._scrollable = (this.getSettings().useTranslate) ? new ScrollableHA(this.getScrollableEl()[0], scrollableOptions) : new ScrollableNative(this.getScrollableEl()[0], scrollableOptions);

			this._scrollable.init();

			this._on(this.getScrollableEl(), 'scroll', this._onScroll);

			Overflow._super.init.call(this);

			this.refresh();

			return this;
		};

		/**
		 * Checks whether or not the scrollable container can be scrolled
		 * in a certain direction. Applies the right Overflow css classes
		 * trough setOverflow() and removeOverflow().
		 *
		 * @return {Overflow}
		 */
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

			return this;
		};

		/**
		 * Adds the overflow css class
		 *
		 * @param {String}
		 * @return {Overflow}
		 */
		Overflow.prototype.setOverflow = function (pos) {
			this.getEl().addClass(this.getSettings().css[pos]);

			return this;
		};

		/**
		 * Removes the overflow css class
		 *
		 * @param  {String}
		 * @return {Overflow}
		 */
		Overflow.prototype.removeOverflow = function (pos) {
			this.getEl().removeClass(this.getSettings().css[pos]);

			return this;
		};

		/**
		 * Getter for scrollableEl
		 *
		 * @return {jQuery}
		 */
		Overflow.prototype.getScrollableEl = function () {
			return this._resolveElement(this.getSettings().selectors.scrollableEl);
		};

		/**
		 * All teardown logic should go here
		 *
		 * @return {void}
		 */
		Overflow.prototype.destroy = function () {

			var classes;

			classes = this.getSettings().css;

			this._$scrollableEl = undefined;

			this._scrollable.destroy();
			this._scrollable = undefined;

			this.getEl()
				.removeClass(classes.begin)
				.removeClass(classes.end);

			Overflow._super.destroy.call(this);

			return this;
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
