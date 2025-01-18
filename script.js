class TerminalPortfolio {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.commandsList = document.getElementById('commands-list');
        this.setupEventListeners();
        this.commandHistory = [];
        this.historyIndex = -1;
        
        // Available commands and their responses
        this.commands = {
            'help': 'Available commands: about, skills, projects, contact, clear, help',
            'about': `Hi! I'm [Your Name], a [Your Title] based in [Your Location].
                     \nI specialize in [Your Specialties].
                     \nType 'skills' to see what I can do!`,
            'skills': `Technical Skills:
                      \n• Frontend: HTML, CSS, JavaScript, React
                      \n• Backend: Node.js, Python, SQL
                      \n• Tools: Git, Docker, AWS`,
            'projects': `Recent Projects:
                        \n1. Project One - Description here
                        \n2. Project Two - Description here
                        \n3. Project Three - Description here`,
            'contact': `Get in touch:
                       \n• Email: your.email@example.com
                       \n• GitHub: github.com/yourusername
                       \n• LinkedIn: linkedin.com/in/yourusername`,
            'clear': 'clear'
        };

        this.typeWelcomeMessage();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        });
    }

    async typeWelcomeMessage() {
        const welcomeText = "Welcome to my terminal portfolio. Type 'help' to see available commands.";
        const element = document.getElementById('welcome-text');
        await this.typeText(element, welcomeText);
    }

    async typeText(element, text) {
        for (let char of text) {
            element.textContent += char;
            await new Promise(resolve => setTimeout(resolve, 30));
        }
    }

    handleCommand() {
        const command = this.input.value.trim().toLowerCase();
        
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            
            const outputDiv = document.createElement('div');
            outputDiv.className = 'line';
            outputDiv.innerHTML = `<span class="prompt">visitor@portfolio:~$</span> <span class="command">${command}</span>`;
            
            if (command === 'clear') {
                this.commandsList.innerHTML = '';
            } else {
                const response = this.commands[command];
                if (response) {
                    const responseDiv = document.createElement('div');
                    responseDiv.className = 'output';
                    responseDiv.innerText = response;
                    outputDiv.appendChild(responseDiv);
                } else {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error';
                    errorDiv.innerText = `Command not found: ${command}. Type 'help' for available commands.`;
                    outputDiv.appendChild(errorDiv);
                }
                this.commandsList.appendChild(outputDiv);
            }
        }
        
        this.input.value = '';
        this.scrollToBottom();
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down') {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
        }
    }

    scrollToBottom() {
        const terminal = document.querySelector('.terminal-content');
        terminal.scrollTop = terminal.scrollHeight;
    }
}

// Initialize the terminal
const terminal = new TerminalPortfolio();
