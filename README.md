<p align="center">
    <img height="200" width="200" src="https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/logo.png" />
</p>
<h1 align="center">
    Dreampack 
</h1>

Visit [Dreampack, a web-based dream journal application!](https://dreampack.app/)

## What is Dreampack?

Dreampack is a toolkit for hobbyist dream journalers and lucid dreamers, including several features to aid dream journaling, dream recall, reality checks, and dream sign tracking.
It is intended to be easy to use and desktop/mobile friendly for users of both preferences. It is free to use, and open source with all of the code available in this repo.
Dreamers who use the app will find it helps facilitate an improved relationship with their dream journeys in general, provided they use the tools available to them to their
fully potential.

If you're uninformed as to what [dream journaling](https://en.wikipedia.org/wiki/Dream_diary) or [lucid dreaming](https://en.wikipedia.org/wiki/Lucid_dream) are, that
doesn't mean you can't use the app! Dreampack makes it easy to start recording and paying attention to your dreams over time. If you read some blogs or books
on the subject, you'll find a lot of the techniques that are taught in them are covered as built-in features Dreampack.

Check out the live site at: https://dreampack.app/

## Features

### Write, save and edit journal entries
1. Log in and you will see the new entry form, or else click the "+New Entry" button to navigate to the form.
![New Entry button](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/screenshot-20231005-033514Z-selected.png)
2. Enter text in the Title and Body fields.
![Title and Body Fields](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/new_entry_3.png)
3. Click the save entry button. <br />
![Save Entry button](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/new_entry_2.png)

### Highlight and save dream signs
1. Select the text you wish to turn into a dream sign. Click the popover button that says "Dream Sign" to turn the selected text into a dream sign. <br />
![Dream Sign Popover](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/dream_sign_1.png)
2. The text will now be highlighted pink. Any future text that matches the phrase will also be highlighted for you. <br />
![Dream Sign Highlight](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/dream_sign_2.png)

## OpenAI Features
*Note: You will have to save your OpenAI API key to your account via [Dreampack's Settings page](https://dreampack.app/settings) in order to use Dream Interpretation, Audio Transcription and Image Generation features. Read this link to OpenAI's help pages to find out [Where do I find my Secret API Key?](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)*

### Interpret your dream with AI
1. Navigate to your desired entry and click the "Go to Interpretation" link in order to navigate to the Interpretation page <br />
![Go to Interpretation Button](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/ai_interpretation_1.png)
2. Click the "Interpet with AI" button <br />
![Interpret Button](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/ai_interpretation_2.png)
3. Wait for the interpretation to generate <br />
![AI Interpretation](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/ai_interpretation_3.png)

### Audio-to-text transcription to speak your entries to life
1. Prepare your microphone. This can be a phone mic if you're on mobile or a regular computer mic on desktop.
2. Navigate to the New Entry page and click the "Start Recording" button. Optional: Add a title, which will be generated automatically if left empty. <br />
![Record Button](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/whisper_1.png)
3. Speak your entry into the microphone.
4. Click the "Stop Recording" button when you're finished. <br />
![Stop Recording button](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/whisper_2.png)
5. Wait for the transcription to complete, when it's finished your audio will be transcribed into text and the entry automatically saved. <br />
![Whisper Transcription](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/whisper_3.png)

### Generate images for your dreams
1. Navigate to your desired entry.
2. Click the "Generate Image" button and wait for it to generate. <br />
![Generate Image Button](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/dalle_1.png)
3. A new button will appear which is a smaller version of the generated image, click it in order to see the full size, and click away to make it disappear. <br />
![Generated Image](https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/dalle_3.png)

### Responsive, sleek and colorful UI
- Works on Mobile! <br />
<img src="https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/mobile.png" width="200" />

## Technologies

- Ruby on Rails
- React.js
- Tailwind
- Postgresql
- OpenAI API: ChatGPT, Whisper, DALLE-2
- RSpec
- Cypress

## Local Setup

Currently, the only way to interact with Dreampack is locally. It will be deployed soon!

1. Check if you have Ruby 3.1.2 by entering `ruby -v` into the terminal. I recommend [rbenv](https://github.com/rbenv/rbenv) for managing versions
2. Enter `rails -v` in the terminal to ensure you have Rails 7.0.5 installed
3. `psql --version` to ensure you have PostgreSQL 14.9 installed (make sure you have a user and password)
4. If you need more information on setting up PostgreSQL with rails, see [this great resource](https://www.theodinproject.com/lessons/ruby-on-rails-installing-postgresql)
5. Fork the repository and copy SSH key
6. Enter `git clone <'SSH Key'> in the terminal and enter`
7. `bundle install` and `yarn install` to install dependencies
8. `bundle exec figaro install` to install [Figaro](https://github.com/laserlemon/figaro), which you'll need to handle your OpenAI API key
9. You'll need to sign up for an [OpenAI account](https://platform.openai.com/signup) if you want to use the AI Features
10. In your OpenAI account dashboard, click the profile icon in the top right, click `View API Keys` and then click `Create new secret key`, copy it for the next step
11. Open the `application.yml` file and enter `OPENAI_ACCESS_TOKEN: <'Your OpenAI API Key'>` without the <''>, just the key you copied earlier
12. `rails db:setup` to create the database and load the schema
13. `bin/rails db:migrate` to run migrations
14. `bin/dev` to run the local server
15. localhost:3000 in your web browser to access the application
