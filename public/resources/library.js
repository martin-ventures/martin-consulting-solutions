// MCS resource library: the optional "Email me the PDF" form.
// The page is complete without this script; it only sends the form to Meridian.
(function () {
  var ENDPOINT = "https://meridian.martincs.org/api/library-request";
  document.querySelectorAll("form.library-form").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector("button[type=submit]");
    function say(text, ok) { status.textContent = text; status.style.color = ok ? "#86efac" : "#fca5a5"; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) { say("That email address does not look right.", false); return; }
      button.disabled = true;
      say("Sending...", true);
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resource: form.dataset.resource, email: email, name: form.name.value.trim(), updates: form.updates.checked, company_url: form.company_url.value })
      })
        .then(function (res) { return res.json().catch(function () { return {}; }).then(function (body) { return { ok: res.ok, body: body }; }); })
        .then(function (r) {
          if (!r.ok) { say(r.body.error || "That did not go through. Please email info@martincs.org and we will send it.", false); button.disabled = false; return; }
          say(r.body.sent === false
            ? "We have your request. The PDF will come from info@martincs.org shortly."
            : "Sent. Look for an email from info@martincs.org in the next few minutes.", true);
          form.reset();
        })
        .catch(function () { say("That did not go through. Please email info@martincs.org and we will send it.", false); button.disabled = false; });
    });
  });
})();
