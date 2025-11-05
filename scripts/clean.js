// Cross-platform clean script
const fs = require('fs');
const path = require('path');

function removeDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  
  fs.readdirSync(dir).forEach(file => {
    const curPath = path.join(dir, file);
    
    if (fs.lstatSync(curPath).isDirectory()) {
      removeDir(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
  
  fs.rmdirSync(dir);
}

// Remove directories
['dist', 'coverage'].forEach(dir => {
  try {
    removeDir(dir);
    console.log(`✅ Cleaned ${dir}/`);
  } catch (error) {
    // Directory might not exist, which is fine
    if (error.code !== 'ENOENT') {
      console.error(`⚠️  Error cleaning ${dir}:`, error.message);
    }
  }
});

