describe('Overflow', function () {

	'use strict';

	var instance, $container, classes;

	jasmine.getFixtures().fixturesPath = '/base/test/fixtures/';
	jasmine.getStyleFixtures().fixturesPath = '/base/test/fixtures/';

	beforeEach(function () {

		loadStyleFixtures('style.css');
		loadFixtures('index.html');

		if(instance) {
			instance.destroy();
		}

		$container = $('.container');
		instance = new pintxos.Overflow($container[0]).init();

		classes = instance.getSettings().css;
	});

	describe('setOverflow', function () {

		it('should add the css class', function () {

			// make sure all classes are gone
			$container.removeClass(classes.begin);
			$container.removeClass(classes.end);

			instance.setOverflow(pintxos.Overflow.BEGIN);
			expect($container.hasClass(classes.begin)).toBe(true);

			instance.setOverflow(pintxos.Overflow.END);
			expect($container.hasClass(classes.end)).toBe(true);
		});
	});

	describe('removeOverflow', function () {

		it('should remove the css class', function () {

			// set css classes
			$container.addClass(classes.end);
			$container.addClass(classes.begin);

			instance.removeOverflow(pintxos.Overflow.END);
			expect($container.hasClass(classes.end)).toBe(false);

			instance.removeOverflow(pintxos.Overflow.BEGIN);
			expect($container.hasClass(classes.begin)).toBe(false);
		});
	});

	describe('refresh', function () {

		it('should add an overflowEnd css class', function () {
			$container.removeClass(classes.begin);
			instance._scrollable.setScrollPos(0);
			instance.getScrollableEl().trigger('scroll');
			expect($container.hasClass(classes.end)).toBe(true);
		});

		it('should add an overflowBegin css class', function () {
			$container.removeClass(classes.end);
			instance._scrollable.setScrollPos(instance._scrollable.getMaxScrollPos());
			instance.getScrollableEl().trigger('scroll');
			expect($container.hasClass(classes.begin)).toBe(true);
		});
	});

	describe('init', function () {

		it('should add css classes if needed', function () {
			expect($container.hasClass(classes.end)).toBe(true);
		});
	});

	describe('getScrollableEl', function () {

		it('should return the scrollable element', function () {
			expect(instance.getScrollableEl()[0]).toEqual($container[0]);
		});
	});

	describe('destroy', function () {

		it('should remove all overflow css classes', function () {
			instance._scrollable.setScrollPos(100);
			instance.destroy();
			expect($container.hasClass(classes.end)).toBe(false);
			expect($container.hasClass(classes.begin)).toBe(false);
		});
	});
});
