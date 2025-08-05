import { AppConfig } from "../sgs/apps/config";

import $ from "jquery";
import { isUndefined, isEmpty, isNull } from "lodash-es";

class StickyAddToCart extends AppConfig {
	/* inspired by: https://www.e-datacomputer.ro
	 *
	 */

	product_summary = $(".product-summary__form");
	pos = this.product_summary.height();

  btn_increment = $(".btn.btn-increment");
  btn_decrement = $(".btn.btn-decrement");
  field_quantity = $('.quantity-spinner input[type="text"]')

	constructor() {
		super("StickyAddToCart");

		let _functions = Object.getOwnPropertyNames(
			Object.getPrototypeOf(this),
		).filter(
			(name) => name !== "constructor" && typeof this[name] === "function",
		);

	}

	render() {}

	ready() {
		let self = this;

		if (!isEmpty(this.product_summary)) {

			$(window).on("scroll", function () {
				let fix = $(this).scrollTop() > self.product_summary.offset().top,
					e = $(".sticky-add-to-cart-wrapper"),
					i = e.find(".sticky-add-to-cart");

				if (fix) {
					e.css({ height: 0 });
					i.addClass("sticky-add-to-cart--active");
					i.removeClass("sticky-add-to-cart--hide");
				} else {
					i.removeClass("sticky-add-to-cart--active");
					i.addClass("sticky-add-to-cart--hide");
					e.css({ height: "auto" });
				}
			});
		}

    const field_quantity = $('.quantity-spinner input[type="text"]');

    let timer;
    field_quantity.on("change keyup", function (evt) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log($(this).val());
      }, 100); // Adjust delay as needed (100ms is usually good)
    });
	}
}

export default StickyAddToCart;
