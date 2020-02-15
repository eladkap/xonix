const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const FPS = 30;

/* COLORS */
const BLACK = [0, 0, 0];
const BLACK1 = [20, 20, 20];
const WHITE = [255, 255, 255];
const GRAY1 = [100, 100, 100];
const GRAY2 = [150, 150, 150];
const GRAY3 = [200, 200, 200];
const RED = [250, 0, 0];
const ORANGE = [255, 150, 50];
const PINK = [250, 0, 150];
const YELLOW = [255, 255, 0];
const GREEN = [0, 250, 0];
const AQUA = [100, 255, 255];
const BLUE = [0, 0, 250];
const PURPLE = [200, 0, 250];
const NAVY = [0, 0, 128];

const OBJECT_RADIUS = 10;

/* Board Settings */
const BOARD_POS_X = 60;
const BOARD_POS_Y = 70;
const BOARD_ROWS = 23;
const BOARD_COLS = 34;
const CELL_SIZE = 20;
const BOARD_WIDTH = CELL_SIZE * BOARD_COLS;
const BOARD_HEIGHT = CELL_SIZE * BOARD_ROWS;

/* States Settings */
const STATES_POS_X = 0;
const STATES_POS_Y = 0;
const STATES_HEIGHT = 50;
const STATES_FONT_SIZE = 16;
const STATES_FONT_FAMILY = 'Helvetica';

/* Pacman Settings */
const PACMAN_SPEED = CELL_SIZE;
const PACMAN_RADIUS = CELL_SIZE / 2;
const LERP_UNIT = 0.2; // Linear Interpolation - Animation movement unit

/* Enemies Settings */
const ENEMIES_NUMBER = 3;
const ENEMY_SPEED = 5;
const ENEMY_RADIUS = CELL_SIZE / 2;
