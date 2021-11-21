FROM rust:1.54.0
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
RUN mkdir src
RUN echo "fn main() {}" > ./src/main.rs
RUN cargo build --release
COPY . .
RUN touch -a -m ./src/main.rs
RUN cargo build --release
ENTRYPOINT [ "/app/target/release/backend" ]