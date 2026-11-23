import { initViewport } from './viewport.js';
import { initNavigation } from './navigation.js';

const stage = document.getElementById('stage');
initViewport(stage);
initNavigation(stage);
