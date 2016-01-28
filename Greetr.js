/*
    GREETR Library
     - When given a first name, last name, and optional language, it generates formal and informal greetings
     - Supports English and Spanish ~ also added French, German, and Swedish
     - G$() structure to make it easier to type
     - Supports jQuery
*/

// Safe code structure - place code in an IIFE
(function(global, $) {
    
    // Set up G$() structure
    var Greetr = function(firstName, lastName, language) {
        
        // Return function constructor so that we don't have to
        // set up the object with the "new" keyword everytime
        return new Greetr.init(firstName, lastName, language);
    };
    
    // Private variables
    var supportedLangs = ['en', 'es', 'fr', 'ge', 'se'];
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Salut',
        ge: 'Hallo',
        se: 'Hej Hej'
    };
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        fr: 'Bonjour',
        ge: 'Guten Tag',
        se: 'Goddag'
    };
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        fr: 'Connecte',
        ge: 'Verbinden',
        se: 'Ansluten'
    };
        
    // Set prototype
    Greetr.prototype = {
        
        // Library functionality methods:
        
        // Return full name
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        // Make sure language sent is supported
        validateLang: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language"
            }
        },
        
        // Regular greeting
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        // Formal greeting
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName() + '.';
        },
        
        // Greet the person
        greet: function(formal) {
            var msg;
            
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            if (console) {
                console.log(msg);
            }
            
            // 'this' refers to the calling object at execution time
            // so returning 'this' makes the method chainable
            return this;
        },
        
        // Log message
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            // Make it chainable
            return this;
        },
        
        // Set the language
        setLang: function(lang) {
            this.language = lang;
            
            // Make sure the language is valid
            this.validateLang();
            
            // Make it chainable
            return this;
        },
        
        // Set name
        setName: function(firstName, lastName) {
            if (firstName) {
                this.firstName = firstName;
            }
            if (lastName) {
                this.lastName = lastName;
            }
            // Make it chainable
            return this;
        },
        // Populate greeting DOM element in selector element
        displayGreeting: function(selector, formal) {
            var msg = formal === "true" ? this.formalGreeting() : this.greeting();
            
            // Edge cases
            if (!$) {
                throw 'jQuery not loaded.';
            }
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            
            // Display greeting
            $(selector).html(msg);
            
            // Make it chainable
            return this;
        }
    };
    
    // Init Greetr
    Greetr.init = function(firstName, lastName, language) {
        // Set the 'this' keyword to a variable to avoid issues
        var self = this;
        
        // Default properties
        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "en";
        
        // Validate language
        self.validateLang();
    }
    
    // Set the init prototype to the Greetr prototype
    Greetr.init.prototype = Greetr.prototype;
    
    // Attach Greetr and it's shorthand G$() to the global object
    global.Greetr = global.G$ = Greetr;
    
    
})(window, jQuery);