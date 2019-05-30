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
    flag && callback && callback();
  }
  this.hide = function () {
    domLogin.style.display = 'none';
  }
}

function ChatRoom () {

  var domUsername = document.getElementById('username');
  var domInput = document.getElementById('text-input');
  var domSend = document.getElementById('text-send');
  this.start = function (callback) {
    domSend.onclick = function () {
      var value = domInput.value;
      if (!!value) callback && callback(value);
    }
  }
  this.clear = function () {
    domInput.value = '';
  }
  this.setUsername = function (username) {
    domUsername.innerHTML = `<b>${username}</b>，欢迎使用！`;
  }
}

function Record () {
  this.list = [];
  var domRecord = document.getElementById('record');
  var domRecordList = document.getElementById('record-list');
  this.push = function (target) {
    this.list.push(target);

    var node = document.createElement('div');
    if (target.status === 1) {
      node.className = 'record-item record-item-notice';
      node.appendChild(document.createTextNode(`${target.msg}`));
    } else if (target.status === 2) {
      node.className = 'record-item record-item-chat';
      var user = document.createElement('div'),
        content = document.createElement('div');
      user.className = 'record-item-chat-user';
      content.className = 'record-item-chat-content';
      user.appendChild(document.createTextNode(target.username));
      content.appendChild(document.createTextNode(target.content));
      node.appendChild(user);
      node.appendChild(content);
    }
    domRecordList.appendChild(node);

    console.log(domRecordList.offsetHeight);
    domRecord.scrollTop  = domRecordList.offsetHeight;

  }
}

var user = new Target();
var room = new ChatRoom();
var record = new Record();
user.start(function (username) {
  socket.emit('user-login', username);
});
room.start(function (value) {
  socket.emit('user-send', {
    username: user.username,
    status: 2,
    msg: '信息发送',
    content: value
  });
})

var socket = io('/');
socket.on('login', function (data) {
  record.push(data);
  user.login(data.username === user.username, function () {
    room.setUsername(data.username);
  });
});
socket.on('message', function (data) {
  record.push(data);
  room.clear();
});
