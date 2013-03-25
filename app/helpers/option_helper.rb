module OptionHelper

  def show_option_with_quantity(opt, quantity)
    qty = "x#{quantity}" if quantity != 1
    show_option(opt) + qty
  end

  def show_option(opt)
    style = "style='font-weight:bold;'" if opt.emphasize
    "<span #{style}>#{opt.tr_description}</span>".html_safe
  end
end
