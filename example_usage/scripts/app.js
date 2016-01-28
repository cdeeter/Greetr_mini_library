$(document).ready(function() {
    
    // Save jQuery selector
    var goBtn = $('#goBtn');
    
    // Display greeting based on the language
    var displayGreeting = function() {
        // Get the variables to create the Greetr object
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var language = $('#lang').val();
        var formal = $('input[name="formal"]:checked').val();
        // Set the Greetr object
        var g = G$(firstName, lastName, language);
        // Get the correct greeting
        g.displayGreeting('#greeting', formal).log();
    };
    
    // Event handler
    goBtn.on('click', displayGreeting);
    
});