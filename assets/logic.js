

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD0fkyaxBua_jyhzx6ANXCSxd2vfJnEG7M",
    authDomain: "traintime-5aa71.firebaseapp.com",
    databaseURL: "https://traintime-5aa71.firebaseio.com",
    projectId: "traintime-5aa71",
    storageBucket: "",
    messagingSenderId: "518240346728"
  };
  firebase.initializeApp(config);

    var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      time: trainTime,
      frequency: trainFreq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(trainName.name);
    console.log(trainDest.destination);
    console.log(trainTime.time);
    console.log(trainFreq.frequency);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
  

// math for train arrival and minuites away
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted + "trainTime");
    

   var currentTime = moment();
   console.log(currentTime + "currentTime");
    
   var diffTime = moment(currentTime).diff(moment(trainTimeConverted),"minutes");
   console.log(diffTime + " add difference"); 
   
   var tRemainder = diffTime % trainFreq;
   console.log(tRemainder + "tRemainder");

   var minutesAway = trainFreq - tRemainder;
   console.log (minutesAway);

   var nextTrain = moment().add(minutesAway, "minutes");
   console.log(moment(nextTrain).format("HH:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(moment(nextTrain).format("HH:mm")),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  