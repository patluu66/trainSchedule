var config = {
      apiKey: "AIzaSyDY4rpWRK2cLgy43Bmbm514kZnYDfX4aYI",
      authDomain: "train-scheduler-cccc1.firebaseapp.com",
      databaseURL: "https://train-scheduler-cccc1.firebaseio.com",
      projectId: "train-scheduler-cccc1",
      storfreqBucket: "",
      messagingSenderId: "124194628948"
    };


    firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Initial Values

    var trainName = "";

    var destination = "";

    var freq = 0;

    var arrivalTime = "";

    // Capture Button Click

    $("#add-user").on("click", function(event) {
      event.preventDefault();

      trainName = $("#trainName-input").val().trim();

      destination = $("#dest-input").val().trim();

      freq = $("#freq-input").val().trim();

      arrivalTime = $("#time-input").val().trim();

      dataRef.ref("Trains").push({

        trainName: trainName,

        destination: destination,

        freq: freq,

        arrivalTime: arrivalTime,

        dateAdded: firebase.database.ServerValue.TIMESTAMP

      });

    });



    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "days");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "hours");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    dataRef.ref("Trains").on("child_added", function(snapshot) {

      // console.log(snapshot.val());

      // console.log(snapshot.val().trainName);

      // console.log(snapshot.val().destination);

      // console.log(snapshot.val().freq);

      // console.log(snapshot.val().arrivalTime);




      var tableRow = $("<tr>");
      tableRow.append($("<td>"));
      

      $("#traintrainName").append("<tr><td>" + (snapshot.val().trainName) + "</td></tr>");

      $("#destination").append("<tr><td>" + (snapshot.val().destination) + "</tr></td>");

      $("#frequency").append("<tr><td>" + (snapshot.val().freq) + "</tr></td>");

      $("#nextArrival").append("<tr><td>" + (snapshot.val().arrivalTime) + "<tr><td>");

      // $("#minutesAway").append("<tr><td>" + tMinutesTillTrain + "<tr><td>");
      $("#minutesAway").append("<tr><td>" + tMinutesTillTrain + "<tr><td>");

    // Handle the errors

    }, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

    });