import request from 'supertest';

import localDataBase from '../src/data-base/local.data.base';
import {
    updateUserData1,
    updateUserData2,
    updateUserData3,
    userData1,
    userData2,
    userData3,
    userDataForScenario1
} from './mockData/user.data';
import 'dotenv/config';

const host = process.env.PORT ? `localhost:${process.env.PORT}` : 'localhost:2000';

const requestApi = request(host);

describe('Testing user api', () => {
    let userId: string;

    beforeAll(() => {
        localDataBase.splice(0, localDataBase.length);
        localDataBase.push(...userDataForScenario1);
    })

    describe('Test for scenario 1', () => {
        it('Get all users records', async () => {
            const users = await requestApi
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(users.body.length).toEqual(3);
            expect(users.body).toEqual(expect.arrayContaining(userDataForScenario1));
        })

        it('Create a new user', async () => {
            const user = await requestApi
                .post('/api/users')
                .send(userData1)
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(userData1));
            userId = user.body.id;
        })

        it('Get user by id', async () => {
            const user = await requestApi
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(userData1));
        })

        it('Update user by userId', async () => {
            const user = await requestApi
                .put(`/api/users/${userId}`)
                .send(updateUserData1)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(updateUserData1));
        })

        it('Delete user by userId', async () => {
            await requestApi
                .delete(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(204);
        })

        it('Get user by id', async () => {
            await requestApi
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(404);
        })
    })

    describe('Test for scenario 2', () => {
        it('Get all users records', async () => {
            const users = await requestApi
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(users.body.length).toEqual(3);
            expect(users.body).toEqual(expect.arrayContaining(userDataForScenario1));
        })

        it('Create a new user', async () => {
            const user = await requestApi
                .post('/api/users')
                .send(userData2)
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(userData2));
            userId = user.body.id;
        })

        it('Get user by id', async () => {
            const user = await requestApi
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(userData2));
        })

        it('Update user by userId', async () => {
            const user = await requestApi
                .put(`/api/users/${userId}`)
                .send(updateUserData2)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(updateUserData2));
        })

        it('Delete user by userId', async () => {
            await requestApi
                .delete(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(204);
        })

        it('Get user by id', async () => {
            await requestApi
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(404);
        })
    })

    describe('Test for scenario 3', () => {
        it('Get all users records', async () => {
            const users = await requestApi
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(users.body.length).toEqual(3);
            expect(users.body).toEqual(expect.arrayContaining(userDataForScenario1));
        })

        it('Create a new user', async () => {
            const user = await requestApi
                .post('/api/users')
                .send(userData3)
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(userData3));
            userId = user.body.id;
        })

        it('Get user by id', async () => {
            const user = await requestApi
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(userData3));
        })

        it('Update user by userId', async () => {
            const user = await requestApi
                .put(`/api/users/${userId}`)
                .send(updateUserData3)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(user.body).toEqual(expect.objectContaining(updateUserData3));
        })

        it('Delete user by userId', async () => {
            await requestApi
                .delete(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(204);
        })

        it('Get user by id', async () => {
            await requestApi
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .expect(404);
        })
    })
})