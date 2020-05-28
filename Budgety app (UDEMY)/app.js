// Budget Controller
var budgetController = (function () {

   var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
   }

   var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
   }

   var data = {
      allItems: {
         exp: [],
         inc: []
      },
      totals: {
         exp: 0,
         inc: 0
      }
   }

   return {
      addItem: function(type, des, val) {
         var newItem, ID;

         // Create new ID
         if (data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
         } else {
            ID = 0;
         }

         // Create new Item of Type
         if (type === 'exp') {
            newItem = new Expense(ID, des, val);
         } else if (type === 'inc') {
            newItem = new Income(ID, des, val);
         }
         // Push it into our Data strucutre
         data.allItems[type].push(newItem);

         // Return the new element
         return newItem;
      },

      testing: function() {
         console.log(data);
      }
   }

})();

// UI Controller
var uIController = (function() {
   var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list'
   }
   return {
      getInput: function() {
         return {
            type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
         }
      },

      addListItem: function(obj, type) {
         var html, newHtml, element;
         // Create HTML with placeholder text
         if (type === 'inc') {
            element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
         } else if (type === 'exp') {
            element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
         }

         // Replace HTML placeholder textContent
         newHtml = html.replace('%id%', obj.id);
         newHtml = newHtml.replace('%description%', obj.description);
         newHtml = newHtml.replace('%value%', obj.value);

         // Insert HTML into the DOM
         document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },

      getDOMstrings: function() {
         return DOMstrings;
      }
   }

})();

// Global App Controller
var controller = (function(budgetCtrl, uICtrl) {
   var setupEventListener = function() {
      var DOM = uICtrl.getDOMstrings();

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

      document.addEventListener('keypress', function(event) {
         if (event.code === 'Enter') {
            ctrlAddItem();
         }
      });
   }

   var ctrlAddItem = function() {
      var input, newItem;

      // 1. Get the field input data
      input = uICtrl.getInput();

      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      uICtrl.addListItem(newItem, input.type);
      // 4. Clear the fields

      // 5. Calculate and update budget
   }

   return {
      init: function() {
         console.log('App started');
         setupEventListener();
      }
   }
})(budgetController, uIController);

controller.init();
