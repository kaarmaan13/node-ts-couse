import { yarg } from './config/plugings/args.plugings'
import { ServerApp } from './presentation/server-app'

(async() => {
  await main()
})()

async function main() {
  const {
    b:base,
    l:limit,
    s:showTable,
    d:fileDestination,
    n:fileName
  } = yarg

  ServerApp.run({
    base,
    limit,
    showTable,
    fileDestination,
    fileName
  })
}