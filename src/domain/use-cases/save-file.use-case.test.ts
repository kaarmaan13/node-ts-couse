import fs from 'fs'
import { SaveFile } from './save-file.use-case'

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom—outputs/file—destination',
    fileName: 'custom—table-name'
  }
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`
  afterEach(() => {
    // clean up
    const outputsFolderExist = fs.existsSync('outputs')
    if (outputsFolderExist) fs.rmSync('outputs', { recursive: true })
    
    const customFolderExists = fs.existsSync(customOptions.fileDestination)
    // console.log({customFolderExists});
    if (customFolderExists) fs.rmSync(customOptions.fileDestination.split('/')[0], { recursive: true })
  })

  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content'
    }

    const result = saveFile.execute(options)

    expect(result).toBe(true)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test('should save file with custom values', () => {
    
    const saveFile = new SaveFile()

    const result = saveFile.execute(customOptions)

    expect(result).toBe(true)
    const fileExists = fs.existsSync(customFilePath)
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' })

    expect(fileExists).toBe(true)
    expect(fileContent).toBe(customOptions.fileContent)
  })
  
  test('should return false if directory could not be created', () => {
    
    const saveFile = new SaveFile()

    const mkdirSpy = jest.spyOn(fs, 'mkdirSync')
      .mockImplementation(() => {
        throw new Error('This is a custom Error message for testing purposes!')
      })
    const result = saveFile.execute(customOptions)

    expect( result ).toBe( false )

    mkdirSpy.mockRestore()
  })

  test('should return false if file could not be created', () => {
    
    const saveFile = new SaveFile()

    const writeFileSpy = jest.spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writting error message!')
      })
    const result = saveFile.execute({ fileContent: 'test' })

    expect( result ).toBe( false )

    writeFileSpy.mockRestore()
  })
})