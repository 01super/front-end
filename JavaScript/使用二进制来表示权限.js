// 使用二进制来表示权限

const READ = 0b0001;
const WRITE = 0b0010;
const EXECUTE = 0b0100;
const DELETE = 0b1000;

/**
 * 求并集
 * 读写权限 */
const READ_WRITE = READ | WRITE;

/**
 * 判断是否具有写权限，当前权限与目标权限的交集是否等于目标权限
 *  */
const CAN_WRITE = (READ_WRITE & WRITE) === WRITE;
console.log("CAN_WRITE: ", CAN_WRITE);

/**
 * 删除权限中的某个权限
 */
const CAN_NOT_WRITE = READ_WRITE & ~WRITE;

console.log("CAN_NOT_WRITE是否可以写", (CAN_NOT_WRITE & WRITE) === WRITE);

console.log("CAN_NOT_WRITE是否可以读", (CAN_NOT_WRITE & READ) === READ);

function hasPermission(currentPermission, targetPermission) {
  return (currentPermission & targetPermission) === targetPermission;
}

function addPermission(currentPermission, targetPermission) {
  return currentPermission | targetPermission;
}

function removePermission(currentPermission, targetPermission) {
  return currentPermission & ~targetPermission;
}

console.log("CAN_NOT_WRITE是否可以写", hasPermission(CAN_NOT_WRITE, WRITE));
console.log("CAN_NOT_WRITE是否可以读", hasPermission(CAN_NOT_WRITE, READ));
