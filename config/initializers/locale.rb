    I18n.load_path += Dir[Rails.root.join('my','locales','*.{rb,yml}')]
    I18n.available_locales = [:fr]
    I18n.default_locale = :fr

