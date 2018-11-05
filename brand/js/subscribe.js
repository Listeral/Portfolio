(function() {
    var content, form, indicator, input, loader;
  
    input = document.querySelector("input");
  
    form = document.querySelector("form");
  
    indicator = document.querySelector(".indicator");
  
    loader = document.querySelector(".loader");
  
    content = input.value;
  
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      indicator.setAttribute("data-content", "saving...");
      loader.classList.add("full");
      return setTimeout((function() {
        indicator.setAttribute("data-content", "you've been subscribed!");
        loader.classList.add("done");
        input.classList.add("full");
        return input.value("");
      }), 3000);
    });
  
    input.addEventListener("input", function() {
      return indicator.setAttribute("data-content", "now hit enter!");
    });
    
  }).call(this);