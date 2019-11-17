const mongoose = require('mongoose');
const fastify = require('fastify')();
const routes = require('./routes');
const path = require('path')
const DistPath = path.join(__dirname, '..', 'dist')

//connect to mongodb atlas
mongoose.connect('mongodb+srv://greekgod:GOaLQn2jKQedMkGO@dearizone-k0zlo.mongodb.net/test?retryWrites=true&w=majority', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.log('MongoDB could not be connected due to ', e));

//handles GET / request
fastify.get('/', async (request, reply) => {
    try {
        return reply.sendFile('index.html')
    }
    catch (e) { console.log(e) }
});

fastify.get('/robots.txt', async (request, reply) => {
    try {
        return reply.sendFile('robots.txt')
    }
    catch (e) { console.log(__dirname) }
});

fastify.get('/sitemap.xml', async (request, reply) => {
    try {
        return reply.sendFile('sitemap.xml')
    }
    catch (e) { console.log(__dirname) }
});

//iterating over all the routes and registering them with fastify
routes.forEach(route => fastify.route(route))

//launching server at port : 3000 in local environment
fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`server running at ${fastify.server.address().port}`)
})

fastify.register(require('fastify-static'), {
    root: DistPath,
})