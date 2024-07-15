function doGet() {
  return HtmlService.createHtmlOutputFromFile('Uform');
}
// Function to handle a normal event request
function processEventRequest(formData) {
  var date = formData.date;
  var scriptProperties = PropertiesService.getScriptProperties();
  var numReqOnDate = Number(scriptProperties.getProperty('standard_' + date)) || 0;
  var urgencyReqOnDate = Number(scriptProperties.getProperty('urgent_' + date)) || 0;

  // Check if the date already has 3 requests (2 standard and 1 urgent)
  if (numReqOnDate >= 2 && urgencyReqOnDate >= 1) {
    return { status: "full", message: "Date is full. Please choose a different date." };
  }

  // Check if the request is urgent and if urgent requests are at capacity
  if (formData.urgency === "High") {
    if (urgencyReqOnDate >= 1) {
      return { status: "full", message: "Urgent requests are at capacity. Please choose a different date or submit a non-urgent request." };
    } else {
      // Process the urgent request if under the limit
      scriptProperties.setProperty('urgent_' + date, '1'); // Mark that an urgent request has been made
      addNewRow(formData);
      return { status: "success", message: "Your urgent request has been submitted successfully." };
    }
  } else {
    // Check if non-urgent requests are at capacity
    if (numReqOnDate >= 2) {
      return { status: "full", message: "Please select a different date as this one is fully booked for non-urgent requests. Urgent requests may still be submitted." };
    } else {
      // Process the non-urgent request if under the limit
      numReqOnDate++;
      scriptProperties.setProperty('standard_' + date, numReqOnDate.toString());
      addNewRow(formData);
      return { status: "success", message: "Your request has been submitted successfully." };
    }
  }
}

// This function can be adjusted to handle urgent requests separately if needed
// However, it currently calls processEventRequest, which already checks the urgency level
function processUrgentRequest(formData) {
  return processEventRequest(formData); // Urgent requests use the same processing logic
}

// Function to check if a date is available for non-urgent requests
function isDateAvailable(date) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var numReqOnDate = Number(scriptProperties.getProperty('standard_' + date)) || 0;
  return numReqOnDate < 2; // Limit for non-urgent requests
}

// Function to check if a date is available for urgent requests
// You may use this if needed, but it’s not utilized in the provided example
function isUrgentDateAvailable(date) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var urgencyReqOnDate = Number(scriptProperties.getProperty('urgent_' + date)) || 0;
  return urgencyReqOnDate < 1; // Limit for urgent requests
}

// Function to add a new row to the Results sheet remains the same
function addNewRow(formData) {
  // Existing implementation
}
