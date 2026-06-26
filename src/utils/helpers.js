export function getCategoryColor(category) {
  const colors = {
    Engineering: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    HR: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    Sales: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}

export function getCategoryIcon(category, categoryIcons = {}) {
  return categoryIcons[category] || '📁';
}

export function getAppIcon(app, categoryIcons = {}) {
  return app.icon || getCategoryIcon(app.category, categoryIcons);
}

export function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
