(function ($) {
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phonenumber");
  const linkedin = document.getElementById("linkedin");
  $("input[name='phonenumber']").keyup(function () {
    console.log($(this).val().length);
    if ($(this).val().length >= 8) {
      $(this).val(
        $(this)
          .val()
          .replace(/^(\d{3})(-\d{3})(\d+)$/, "$1$2-$3")
      );
    } else if ($(this).val().length <= 6 && $(this).val().length > 3) {
      $(this).val(
        $(this)
          .val()
          .replace(/^(\d{3})(\d+)$/, "$1-$2")
      );
    }
  });
  const form = document.getElementById("update-user");
  form.addEventListener("submit", function addProduct(event) {
    event.preventDefault();
    $("#error-div").hide();
    let isValid = true;
    firstName.value = firstName.value.replace(/\s/g, "");
    if (firstName.value.length == 0) {
      $("#firstname-errmsg").html("First Name is empty").show().fadeOut(3000);
      firstName.focus();
      isValid = false;
    }

    lastName.value = lastName.value.replace(/\s/g, "");
    if (lastName.value.length == 0) {
      $("#lastname-errmsg").html("Last Name is empty").show().fadeOut(3000);
      isValid = false;
    }

    email.value = email.value.replace(/\s/g, "");
    if (email.value.length == 0) {
      $("#email-errmsg")
        .html("Email must be at least 5 characters long")
        .show()
        .fadeOut(3000);
      isValid = false;
    } else if (!isEmail(email.value)) {
      $("#email-errmsg")
        .html("Email must be at least 5 characters long")
        .show()
        .fadeOut(3000);
      isValid = false;
    }

    phoneNumber.value = phoneNumber.value.replace(/\s/g, "");
    if (phonenumber.value.length == 0) {
      $("#phonenumber-errmsg")
        .html("Phonenumber is empty")
        .show()
        .fadeOut(3000);
      isValid = false;
    } else if (!checkPhoneNumber(phoneNumber.value)) {
      $("#phonenumber-errmsg")
        .html("Please enter a valid phone number (xxx-xxx-xxxx)")
        .show()
        .fadeOut(3000);
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "/users/update",
      contentType: "application/json",
      data: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        linkedin: linkedin.value,
        phonenumber: phoneNumber.value,
      }),
      dataType: "text",
      success: function (responseMessage) {
        window.location.replace("/");
      },
      error: function (error) {
        const msg = JSON.parse(error.responseText).message.preventXSS();
        $("#errmsg").html(msg).show().fadeOut(3000);
      },
    });
  });
})(window.jQuery);
