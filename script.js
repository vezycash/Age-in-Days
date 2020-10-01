let input = document.getElementById("birthDate");
let datepicker = new TheDatepicker.Datepicker(input);
datepicker.options.setMaxDate(new Date());
datepicker.options.setInputFormat("n/j/Y");
datepicker.options.setShowCloseButton(false);
datepicker.options.setShowDeselectButton(false);

datepicker.render();

const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

const result = document.getElementById("result");

datepicker.options.onSelect((event, day, previousDay) => {
  result.textContent = "Calculating...";

  setTimeout(getDays, 1000);
});

function getDays() {
  const now = new Date();

  const dob = new Date(datepicker.getSelectedDate());
  const days = diffDays(now, dob);
  console.log(datepicker.getSelectedDateFormatted());

  const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num);

  result.textContent = !isNaN(Date.parse(input.value))
    ? `You are ${formatNumber(days)} ${days > 1? "days": "day"} old.`
    : "Please enter a valid date.";

  // result.textContent = dob;
}

function reset() {
  datepicker.reset();
  input.value = "";
  result.textContent = "What's your Date of Birth?";
}
