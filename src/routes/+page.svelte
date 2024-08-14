
<script land="ts">
  import Youtube from "svelte-youtube-embed";
</script>

<div class="w-full flex flex-col items-center p-32">
    <div class="flex flex-col items-start w-[800px] gap-10">
        <div class="flex flex-col gap-5"> 
            <h1 class="text-4xl font-bold">Tutorial</h1>
            <div class="w-[800px]">
                <Youtube id="ja4SOmLjIJE" animations={false}/>
            </div>
        </div>

        <div class="flex flex-col gap-5"> 
            <h1 class="text-4xl font-bold">Limitation</h1>
            <div>
                The quality of this tool is highly dependent on the ability to detect sections based on topic shifts properly. A good section detection / topic shift detection mechanism will make the contextual summaries more modular.
            </div>
            <div>
                Each contextual summary should only be talking about one thing. If the section boundaries are not properly detected, then some sections "bleed" into more than one contextual summary. And that is really bugging me because when a user views two detail levels at once when there are clear section markers like in <a class="font-bold" href="/sa-successful">Sam Altman's article</a>, and the section detection sucks, it is just so glaringly visible.
            </div>
            <div>
                Also, I haven't really had an idea yet for how this could work for mobile. Just because viewing to detail levels at once requires some horizontal space. 
            </div>
            <div>
                These are just the things I can think of right now. I am sure there are more.
            </div>
        </div>

        <div class="flex flex-col gap-5"> 
            <h1 class="text-4xl font-bold">Plan</h1>
            <div>
                My current plan is to see if people see the value of this approach to tackle feeling lost in long texts. I am going to find better channels for tackling the problem more agressively and closer to the core, and I want to improve the section detection mechanism of the tool and make it able to ingest research papers and ebooks.
            </div>
            <div>
                At the end of the day, what I really want is to make hard information more understandable and elegant.
            </div>
        </div>

        <div class="flex flex-col gap-5"> 
            <h1 class="text-4xl font-bold">Contact</h1>
            <div>
                email: stenlibigboy@gmail.com (please don't judge the name)
            </div>
            <div>
                github: https://github.com/stankur
            </div>

        </div>
        <div class="flex flex-col gap-5"> 
            <h1 class="text-4xl font-bold">Thanks</h1>
            <div>
                Thank you to these people whom I bug often for asking questions and advice:
            </div>
            <div>
                Samuel H, Sam L, Michael S, Ryan D, Arjav P
            </div>
            <div>
                I appreciate the quality of thoughts that you guys have brought to the table. Just thank you so much.
            </div>

        </div>

    </div>
</div>
