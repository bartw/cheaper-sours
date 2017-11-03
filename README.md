# Hearse-corpus

## About

- [Hearse](https://en.wikipedia.org/wiki/Hearse)
- [Corpus](https://en.wikipedia.org/wiki/Corpus)

## Docker

```shell
docker build -t hearse-corpus .
docker run --rm --shm-size=512m -p 3000:3000 -e "base_url=https://google.com" hearse-corpus
```

## Heroku

```shell
heroku container:login
docker build -t hearse-corpus .
heroku container:push web -a hearse-corpus
```

## License

Hearse-corpus is licensed under the [MIT License](LICENSE).