import type {
    RedditAPIClient,
    RedisClient,
    Scheduler,
  } from '@devvit/public-api';
  import type { Dictionary } from '../types/Dictionary.js';
  import type { GameSettings } from '../types/GameSettings.js';


  export class Service {
    readonly redis: RedisClient;
    readonly reddit?: RedditAPIClient;

    constructor(context: { redis: RedisClient; reddit?: RedditAPIClient; scheduler?: Scheduler }) {
        this.redis = context.redis;
        this.reddit = context.reddit;
    }

     // Game settings
  getGameSettingsKey(): string {
    return 'game-settings';
  }

  async storeGameSettings(settings: { [field: string]: string }): Promise<void> {
    const key = this.getGameSettingsKey();
    await this.redis.hSet(key, settings);
  }

  async getGameSettings(): Promise<GameSettings> {
    const key = this.getGameSettingsKey();
    return (await this.redis.hGetAll(key)) as GameSettings;
  }

  // Dynamic dictionary
  getDictionaryKey(dictionaryName: string): string {
    return `dictionary:${dictionaryName}`;
  }

  async upsertDictionary(
    dictionaryName: string,
    newWords: string[]
  ): Promise<{ rows: number; uniqueNewWords: string[]; duplicatesNotAdded: string[] }> {
    const key = this.getDictionaryKey(dictionaryName);
    const existingJSON = await this.redis.get(key);
    const existingWords = existingJSON ? JSON.parse(existingJSON) : [];

    const uniqueNewWords = newWords.filter((word) => !existingWords.includes(word));
    const duplicatesNotAdded = newWords.filter((word) => existingWords.includes(word));

    const updatedWordsJson = JSON.stringify(Array.from(new Set([...existingWords, ...newWords])));
    await this.redis.set(key, updatedWordsJson);
    return { rows: uniqueNewWords.length, uniqueNewWords, duplicatesNotAdded };
  }

  async removeWordFromDictionary(
    dictionaryName: string,
    wordsToRemove: string[]
  ): Promise<{ removedCount: number; removedWords: string[]; notFoundWords: string[] }> {
    const key = this.getDictionaryKey(dictionaryName);
    const existingJSON = await this.redis.get(key);
    const existingWords: string[] = existingJSON ? JSON.parse(existingJSON) : [];
    const updatedWords = existingWords.filter((word) => !wordsToRemove.includes(word));

    const removedCount = existingWords.length - updatedWords.length;
    const removedWords = wordsToRemove.filter((word) => existingWords.includes(word));
    const notFoundWords = wordsToRemove.filter((word) => !removedWords.includes(word));

    const updatedWordsJson = JSON.stringify(updatedWords);
    await this.redis.set(key, updatedWordsJson);

    return { removedCount, removedWords, notFoundWords };
  }

  async getActiveDictionaries(): Promise<Dictionary[]> {
    // Determine which dictionaries to fetch
    const gameSettings = await this.getGameSettings();
    const defaultDictionary = 'main';
    const dictionaries = [gameSettings.selectedDictionary];
    if (gameSettings.selectedDictionary !== defaultDictionary) {
      dictionaries.push(defaultDictionary);
    }

    // Fetch and parse the dictionaries
    return await Promise.all(
      dictionaries.map(async (dictionaryName) => {
        const key = this.getDictionaryKey(dictionaryName);
        const dictionaryJsonString = await this.redis.get(key);
        const parsedDictionary: string[] = dictionaryJsonString
          ? JSON.parse(dictionaryJsonString)
          : [];
        return {
          name: dictionaryName,
          words: parsedDictionary,
        };
      })
    );
  }

  async selectDictionary(dictionaryName: string): Promise<void> {
    const gameSettings = await this.getGameSettings();
    gameSettings.selectedDictionary = dictionaryName;
    await this.storeGameSettings(gameSettings);
  }

  }


