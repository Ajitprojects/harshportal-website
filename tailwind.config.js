/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
		 colors: {
      input: '#1a1a2e',
    },
  		backgroundImage: {
  			'cyber-grid': 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)'
  		},
  		colors: {
  			primary: {
  				'50': '#f0f9ff',
  				'100': '#e0f2fe',
  				'200': '#bae6fd',
  				'300': '#7dd3fc',
  				'400': '#38bdf8',
  				'500': '#0ea5e9',
  				'600': '#0284c7',
  				'700': '#0369a1',
  				'800': '#075985',
  				'900': '#0c4a6e',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent: {
  				'50': '#fdf4ff',
  				'100': '#fae8ff',
  				'200': '#f5d0fe',
  				'300': '#f0abfc',
  				'400': '#e879f9',
  				'500': '#d946ef',
  				'600': '#c026d3',
  				'700': '#a21caf',
  				'800': '#86198f',
  				'900': '#701a75',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			cyber: {
  				cyan: '#00ffff',
  				magenta: '#ff00ff',
  				green: '#00ff7f',
  				yellow: '#ffff00',
  				blue: '#0080ff',
  				purple: '#8000ff',
  				pink: '#ff0080',
  				orange: '#ff8000'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'Orbitron',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'Space Mono',
  				'monospace'
  			],
  			cyber: [
  				'Rajdhani',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		animation: {
			  spin: "spin 1s linear infinite",
  "spin-slow": "spin 3s linear infinite",
  			float: 'cyberFloat 6s ease-in-out infinite',
  			glow: 'cyberPulse 2s ease-in-out infinite',
			 'typewriter-loop': 'typeLoop 4s steps(13) infinite, blink 1s step-end infinite',
  			'slide-up': 'cyberSlideIn 0.5s ease-out',
  			glitch: 'glitch 2s infinite',
  			matrix: 'matrixFall 3s linear infinite',
  			gradient: 'cyberpunkGradient 3s ease-in-out infinite',
  			shimmer: 'cyberShimmer 1.5s infinite',
  			grid: 'gridMove 20s linear infinite',
  			holographic: 'holographicShine 2s linear infinite'
  		},
		
  		keyframes: {
  			cyberFloat: {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'33%': {
  					transform: 'translateY(-15px) rotate(1deg)'
  				},
  				'66%': {
  					transform: 'translateY(8px) rotate(-1deg)'
  				}
  			},
			   typeLoop: {
      '0%': { width: '0' },
      '40%': { width: '100%' },
      '60%': { width: '100%' },
      '100%': { width: '0' }
    },
	  blink: {
      '0%, 100%': { borderColor: 'transparent' },
      '50%': { borderColor: 'rgba(192,132,252,0.7)' }
    },
  			cyberPulse: {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(0, 255, 255, 0.8)'
  				}
  			},
  			cyberSlideIn: {
  				'0%': {
  					transform: 'translateY(100px) rotateX(90deg)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0) rotateX(0deg)',
  					opacity: '1'
  				}
  			},
  			glitch: {
  				'0%, 100%': {
  					transform: 'translate(0)'
  				},
  				'20%': {
  					transform: 'translate(-2px, 2px)'
  				},
  				'40%': {
  					transform: 'translate(-2px, -2px)'
  				},
  				'60%': {
  					transform: 'translate(2px, 2px)'
  				},
  				'80%': {
  					transform: 'translate(2px, -2px)'
  				}
  			},
  			matrixFall: {
  				'0%': {
  					transform: 'translateY(-100vh)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateY(100vh)',
  					opacity: '0'
  				}
  			},
  			cyberpunkGradient: {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			cyberShimmer: {
  				'0%': {
  					backgroundPosition: '200% 0'
  				},
  				'100%': {
  					backgroundPosition: '-200% 0'
  				}
  			},
  			gridMove: {
  				'0%': {
  					backgroundPosition: '0 0'
  				},
  				'100%': {
  					backgroundPosition: '50px 50px'
  				}
  			},
  			holographicShine: {
  				'0%': {
  					backgroundPosition: '-200% -200%'
  				},
  				'100%': {
  					backgroundPosition: '200% 200%'
  				}
  			}
  		},
  		clipPath: {
  			polygon: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)'
  		},
  		backdropBlur: {
  			cyber: '20px'
  		},
  		boxShadow: {
  			cyber: '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.2)',
  			'neon-cyan': '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
  			'neon-magenta': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
  			'neon-green': '0 0 5px #00ff7f, 0 0 10px #00ff7f, 0 0 15px #00ff7f'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
