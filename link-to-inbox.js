(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.linkToInbox = factory();
	}
}(this, function () {

	var createLink = function(email, filter, onlyMatched, text){
		text = text || 'Check your %s inbox';
		var spec = getSpec(email, filter, onlyMatched);

		if (!spec) {
			return false;
		}

		var href = getHref(email, filter, onlyMatched);
		var linkText = text.replace(/%s/ig, spec.name);

		return '<a href="' + href + '" target="_blank">' + linkText + '</a>';
	}

	var getHref = function(email, filter, onlyMatched){
		var spec = getSpec(email, filter, onlyMatched);

		if (!spec) {
			return false;
		}

		var href = spec.protocol + '://' + spec.domain + spec.path;

		return href;
	}

	var getSpec = function(email, filter, onlyMatched){
		var matched = true;
		var domain = email.split('@')[1];
		var parsedFilters = null;

		var spec = {
			name: domain,
			protocol: 'https',
			domain: domain,
			path: ''
		};

		if (filter) {
			parsedFilters = {};

			if (filter.subject) {
				parsedFilters.subject = encodeURIComponent(filter.subject);
			}

			if (filter.sender) {
				parsedFilters.sender = encodeURIComponent(filter.sender);
			}
		}

		switch (domain) {
			case 'gmail.com':
			case 'googlemail.com':
				spec.name = 'Gmail';
				spec.domain = 'mail.google.com';
				spec.path = '/mail/u/0/';

				if (parsedFilters) {
					spec.path += '#search/in%3Aanywhere';

					if (parsedFilters.subject) {
						spec.path += '+subject%3A%22' + parsedFilters.subject + '%22';
					}

					if (parsedFilters.sender) {
						spec.path += '+from%3A' + parsedFilters.sender;
					}
				}

				break;

			case 'live.com':
			case 'hotmail.com':
			case 'outlook.com':
				spec.name = 'Outlook';
				spec.domain = 'mail.live.com';
				spec.path = '/';

				if (parsedFilters) {
					spec.path += '?fid=flsearch&srch=1&sdr=4&satt=0';

					if (parsedFilters.subject) {
						spec.path += '&skws=' + parsedFilters.subject;
					}
					else if (parsedFilters.sender) {
						spec.path += '&skws=' + parsedFilters.sender;
					}
				}

				break;
				
			default:
				matched = false;
		}

		if (onlyMatched && !matched) {
			return false;
		}

		return spec;
	}
	
	// Just return a value to define the module export.
	// This example returns an object, but the module
	// can return a function as the exported value.
	return {
		createLink: createLink,
		getHref: getHref,
		getSpec: getSpec
	}
}));
