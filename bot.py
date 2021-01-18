import os
import discord
import pyrebase
from discord.ext import commands

client = commands.Bot(command_prefix=">")

config = {
    "apiKey": "AIzaSyDr1C2Ia5tigss8CC4dCzu4z7iZhV_QIdY",
    "authDomain": "coursematch-828fc.firebaseapp.com",
    "databaseURL": "https://coursematch-828fc-default-rtdb.firebaseio.com/",
    "projectId": "coursematch-828fc",
    "storageBucket": "coursematch-828fc.appspot.com",
    "messagingSenderId": "968938856297",
    "appId": "1:968938856297:web:8bef72d70dcf837348a7f8",
    "measurementId": "G-M48V0YJQ81"
}
firebase = pyrebase.initialize_app(config)

database = firebase.database()


def getCourses(token):
    data = database.child(token).get().val()
    if data:
        return data["courses"]
    return None

def courseDoesNotExist(course, categories):
    for cat in categories:
        if (str(cat) == course):
            return False
    return True


@client.event
async def on_ready():
    print('Bot is ready')



@client.command()
async def verify(ctx,number="noCode"):
    courses = getCourses(number)
    if(courses != None):
        for course in courses:
            guild = ctx.message.guild
            if courseDoesNotExist(course,guild.categories):
                category = await ctx.guild.create_category(course)
                await guild.create_text_channel(course, category=category)
                await guild.create_voice_channel(course, category=category)
        for course in courses:
            guild = ctx.message.guild
            for cat in guild.categories:
                if (str(cat) == course):
                    for ch in cat.channels:
                        await ch.set_permissions(ctx.author, read_messages=True,
                                                 send_messages=True)
    elif(number=="noCode"):
        await ctx.send("Please enter a verification number you bitch")
    else:
        await ctx.send("Wrong verification number you bitch")
        x = await ctx.message.channel.create_invite()
        print(x)

client.run("ODAwMDc5MTI1MzIxNjEzMzcy.YAM5wA.cjunkBmHrb2PNuH6vdPdNnnpF2c")
