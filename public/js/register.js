(function ($) {
  $("#logo").on("click", function (event) {
    $(location).attr("href", "/");
  });
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const userName = document.getElementById("username");
  const password = document.getElementById("password");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phonenumber");
  const linkedin = document.getElementById("linkedin");
  const error = document.getElementById("errmsg");
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
  const form = document.getElementById("create-user");
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

    userName.value = userName.value.replace(/\s/g, "");
    if (userName.value.length == 0) {
      $("#username-errmsg").html("Username is empty").show().fadeOut(3000);
      isValid = false;
    } else if (userName.value.length < 5) {
      $("#username-errmsg")
        .html("Username must be at least 5 characters long")
        .show()
        .fadeOut(3000);
      isValid = false;
    }

    password.value = password.value.replace(/\s/g, "");
    if (password.value.length == 0) {
      $("#password-errmsg").html("password is empty").show().fadeOut(3000);
      isValid = false;
    } else if (password.value.length < 6) {
      $("#password-errmsg")
        .html("Password must be at least 6 characters long")
        .show()
        .fadeOut(3000);
      isValid = false;
    } else if (!isValidPassword(password.value)) {
      $("#password-errmsg")
        .html(
          "Password must contain at least one upper, one lower, one special character and one number"
        )
        .show();
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
    if (phoneNumber.value.length == 0) {
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
      url: "/users/register",
      contentType: "application/json",
      data: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        username: userName.value,
        password: password.value,
        email: email.value,
        phonenumber: phoneNumber.value,
        linkedin: linkedin.value
      }),
      dataType: "text",
      success: function (responseMessage) {
        window.location.replace("/");
      },
      error: function (e) {
        error.innerHTML = JSON.parse(
          e.responseText
        ).message.preventXSS();
        error.show();
      },
    });
  });
})(window.jQuery);
