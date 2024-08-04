(function ($) {
  const username = document.getElementById("lusername");
  const password = document.getElementById("lpassword");
  const error = document.getElementById("errmsg");
  const form = document.getElementById("main_login_form");
  form.addEventListener("submit", function login(event) {
    event.preventDefault();
    let isValid = true;
    try {
      checkUsername(username.value);
    } catch (error) {
      $("#username-errmsg").html("Username is invalid").show().fadeOut(3000);
      document.getElementById("username-errmsg").innerHTML = error.preventXSS();
      isValid = false;
    }
    try {
      checkPassword(password.value);
    } catch (error) {
      $("#password-errmsg").html("Password is invalid").show().fadeOut(3000);
      document.getElementById("password-errmsg").innerHTML = error.preventXSS();
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "/login",
      contentType: "application/json",
      data: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      dataType: "text",
      success: function (responseMessage) {
        window.location.replace("/");
      },
      error: function (responseError) {
        console.log(responseError);
        error.innerHTML = JSON.parse(
          responseError.responseText
        ).message.preventXSS();
        error.show();
      },
    });
  });
})(window.jQuery);
