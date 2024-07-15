function addNewRow(formData) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName("Results");

    if (!ws) {
        // If the Results sheet doesn't exist, throw an error or create the sheet here
        throw new Error('Sheet "Results" does not exist.');
    }

    // Get the email of the person who is currently logged in
    // The script will need permission to access this information
    var email = '';
    try {
        email = Session.getActiveUser().getEmail();
    } catch (e) {
        // Handle the error, or set the email to a default/placeholder value if you can't access it
        console.error("Error retrieving user's email: " + e.toString());
    }

    // Append the data to the 'Results' sheet in the order specified by the user
    ws.appendRow([
        formData.date,                     // Date
        formData.time,                     // Time
        formData.urgency,                  // Urgency Level
        formData.requestType,              // Request Type
        email,                             // Email
        formData.emailSubject,             // Email Subject
        formData.emailBodyContent,         // Email Content
        formData.linkedResources,          // Linked Resources
        formData.pointOfContact            // Point of Contact (First & Last)
    ]);
}
