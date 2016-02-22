# link-to-inbox
Creates a link to the webmail inbox based on email address.

## Install
```
npm install link-to-inbox
```

## Usage

### Get the HTML link tag

#### Without filters
```js
var link = linkToInbox.createLink('test@gmail.com');
// '<a href="https://mail.google.com/mail/u/0/" target="_blank">Check your Gmail inbox</a>'
```

#### With filters
```js
var link = linkToInbox.getHref('test@gmail.com', {subject: 'Confirm your account'});
// '<a href="https://mail.google.com/mail/u/0/#search/in%3Aanywhere+subject%3A%Confirm%252520your%252520account%22" target="_blank">Check your Gmail inbox</a>'
```

#### With custom link text
```js
var link = linkToInbox.getHref('test@gmail.com', {subject: 'Confirm your account'}, 'Open in %s');
// '<a href="https://mail.google.com/mail/u/0/#search/in%3Aanywhere+subject%3A%Confirm%252520your%252520account%22" target="_blank">Open in Gmail</a>'
```

### Just get the link

#### Without filters
```js
var link = linkToInbox.getHref('test@gmail.com');
// 'https://mail.google.com/mail/u/0/'
```

#### With filters
```js
var link = linkToInbox.getHref('test@gmail.com', {subject: 'Confirm your account'});
// 'https://mail.google.com/mail/u/0/#search/in%3Aanywhere+subject%3A%Confirm%252520your%252520account%22'
```

## Credits
This JS module is based on the ideas in the following articles:
* https://stories.betalist.com/how-to-make-email-confirmation-a-little-easier-for-your-users-b26125ce3b42
* https://www.quora.com/Many-software-companies-ask-new-users-to-activate-their-account-by-clicking-on-a-link-in-an-email-I-feel-like-this-detracts-from-the-onboarding-experience-How-can-companies-avoid-doing-this-while-also-preventing-spammers-bots-from-signing-up
