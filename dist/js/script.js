
function Target () {
  this.username = '';
  this.isLogin = false;

  var that = this;
  var domConfirm = document.getElementById('username-confirm');
  var domInput = document.getElementById('username-input');
  var domLogin = document.getElementById('login');
  this.start = function (callback) {
    domConfirm.onclick = function () {
      var value = domInput.value || '';
      if (!value) return;

      that.username = value;
      callback && callback(that.username);
    }
  }
  this.login = function (flag, callback) {
    this.isLogin = flag;
    flag && this.hide();
    callback && callback();
  }
  this.hide = function () {
    domLogin.style.display = 'none';
  }
}

var user = new Target();
user.start(function (username) {
  socket.emit('user-login', username);
});

var socket = io('http://localhost:3000/');
socket.on('login', function (username) {
  user.login(username === user.username);
})
