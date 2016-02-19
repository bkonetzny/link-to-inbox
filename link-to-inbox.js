var linkToInbox = (function(){
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

		var spec = {
			name: domain,
			protocol: 'https',
			domain: domain,
			path: ''
		};

		if (filter) {
			if (filter.subject) {
				filter.subject = encodeURIComponent(filter.subject);
			}

			if (filter.sender) {
				filter.sender = encodeURIComponent(filter.sender);
			}
		}

		switch (domain) {
			case 'gmail.com':
			case 'googlemail.com':
				spec.name = 'Gmail';
				spec.domain = 'mail.google.com';
				spec.path = '/mail/u/0/';

				if (filter) {
					spec.path += '#search/in%3Aanywhere';

					if (filter.subject) {
						spec.path += '+subject%3A%22' + filter.subject + '%22';
					}

					if (filter.sender) {
						spec.path += '+from%3A' + filter.sender;
					}
				}

				break;

			case 'live.com':
				spec.name = 'Outlook';
				spec.domain = 'dub131.mail.live.com';
				spec.path = '/';

				if (filter) {
					spec.path += '?fid=flsearch&srch=1&sdr=4&satt=0';

					if (filter.subject) {
						spec.path += '&skws=' + filter.subject;
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
	
	return {
		createLink: createLink,
		getHref: getHref
	}
})();
