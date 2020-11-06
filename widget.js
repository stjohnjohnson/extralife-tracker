$(function () {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  var progressbar = $("#progressbar"),
      progressValue = $(".progress-value"),
      progressGoal = $(".progress-goal"),
      donationGoal = 0,
      donationValue = 0,
      donationPercent = donationValue / donationGoal;

  progressbar.progressbar({
    value: false
  });

  function getLatestData() {
    $.ajax({
      url: 'https://www.extra-life.org/api/participants/{{extraLifeID}}',
      type: 'GET',
      data: '',
      dataType: 'json',
      cache: false,
      success: function (res) {
        donationValue = res.sumDonations;
        donationGoal = res.fundraisingGoal;
        donationPercent = Math.round(donationValue / donationGoal * 100);

        progressGoal.text(formatter.format(donationGoal));
        progressValue.text(formatter.format(donationValue) + " (" + donationPercent + "%)");
        progressbar.progressbar("value", Math.min(donationPercent, 100));
      },
      error: function (res) {
        console.error(res);
      }
    });
  }

  setInterval(getLatestData, 60000);
  getLatestData();
});