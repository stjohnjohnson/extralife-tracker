$(function () {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto'
  });

  function getLatestData() {
    $.ajax({
      url: 'https://www.extra-life.org/api/participants/{{extraLifeID}}/donations?limit={{numberOfDonations}}',
      type: 'GET',
      data: '',
      dataType: 'json',
      cache: false,
      success: function (res) {
        donationList = $('<div>').prop({
          id: 'donation-list'
        });
        res.forEach((donation) => {
          var name = donation['displayName'] || 'Anonymous',
              date = new Date(donation['createdDateUTC']),
              dateMsg = '',
            amount = formatter.format(donation['amount']),
            message = donation['message'];

          // Coverting to relative datetime
          var seconds = (Date.now() - date)/1000;
          if (seconds < 60) {
            dateMsg = rtf.format(Math.floor(-1 * seconds), 'seconds');
          } else if (seconds < 60 * 60) {
            dateMsg = rtf.format(Math.floor(-1 * seconds / 60), 'minutes');
          } else if(seconds < 60 * 60 * 24) {
            dateMsg = rtf.format(Math.floor(-1 * seconds / 60 / 60), 'hours');
          } else {
            dateMsg = rtf.format(Math.floor(-1 * seconds / 60 / 60 / 24), 'days');
          }

          var donationBlock = $('<div>').prop({
            className: 'donation'
          });

          donationBlock.append($('<div>').prop({
            className: 'amount',
            innerText: amount
          }))
          donationBlock.append($('<div>').prop({
            className: 'text'
          }).append($('<div>').prop({
            className: 'name',
            innerText: name
          })).append($('<div>').prop({
            className: 'date',
            innerText: dateMsg
          })).append($('<div>').prop({
            className: 'message',
            innerText: message
          })))

          donationList.append(donationBlock);
        });
        $('#donation-list').replaceWith(donationList);
      },
      error: function (res) {
        console.error(res);
      }
    });
  }

  setInterval(getLatestData, {{frequency}} * 1000);
  getLatestData();
});